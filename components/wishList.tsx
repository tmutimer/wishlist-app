import ListItem, {ListItemProps} from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import NewItemInput from "./newItemInput";
import { useSession } from "next-auth/react";
import { IListItem, IWishlist } from "@/models/Wishlist";

export default function WishList() {
    const {data: session} = useSession();
    const [wishListItems, setWishListItems] = useState<ListItemProps[]>([]);
    const [isAdding, setIsAdding] = useState(false)

    // useCallback is used to memoize the function so that it is not recreated on every render
    const getUpdateItemFunctionCb = useCallback(getUpdateItemFunction, [wishListItems])
    
    function getUpdateItemFunction(id: string) { 
        return (updatedItem: ListItemProps) => {
            setWishListItems(wishListItems.map(item => item.id !== id ? item : {...updatedItem}));
        }
    }

    useEffect(() => {

        if (session?.user?.id) {
            fetchWishList(session.user.id)
        }
        
        async function fetchWishList(userId: string) {
            const response = await fetch(`/api/wishlists?userID=${userId}`)
            const wishListDocument = await response.json()
            setWishListFromDocument(wishListDocument)
        }
        
        function setWishListFromDocument(wishlistDocument: IWishlist) {
            const adaptedData = adaptWishListDocumentToReactProps(wishlistDocument);
            setWishListItems(adaptedData)
        }
        
        function adaptWishListDocumentToReactProps(wishlistDocument: IWishlist): ListItemProps[] {
            const adaptedData: ListItemProps[] = wishlistDocument.listItems.map((item: IListItem) => ({
                id: item._id,
                name: item.name,
                note: item.note,
                price: item.price,
                updateItem: getUpdateItemFunctionCb(item._id)
                }))
            return adaptedData
        }

        
      }, [getUpdateItemFunctionCb, session]);

    function getListItemDocumentFromProps(item: ListItemProps) {
        const { id: itemId, name, note, price } = item
        return { itemId, name, note, price }
    }

    function addItem (newItemTitle: string) {
        if(newItemTitle && newItemTitle.trim()) {
            const newId = uuidv4()
            setWishListItems((prev) => [...prev, {id: newId, name: newItemTitle, note: "", price: NaN, updateItem: getUpdateItemFunctionCb(newId)}])
        }

        setIsAdding(false)
    }

    const triggerAdd = () => setIsAdding(true)



    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
            {wishListItems && wishListItems.map((item) => (
                <ListItem key={item.id} id={item.id} name={item.name} note={item.note} price={item.price} updateItem={getUpdateItemFunction(item.id)} />
            ))}
            { !isAdding ? <AddItemButton onPress={triggerAdd} /> : <NewItemInput submitAction={addItem} /> }
        </main>
    );
}

