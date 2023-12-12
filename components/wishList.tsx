import ListItem, {ListItemProps} from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import NewItemInput from "./newItemInput";
import { useSession } from "next-auth/react";

const getMyWishList  = () => {
    return [
        {
            id: uuidv4(), 
            name: "Harry Potter and the Hard-coded List", 
            note: "It's good",
            price: 9.99
        }, 
        {
            id: uuidv4(), 
            name: "Harry Potter and the Half-blood List", 
            note: "Get on Amazon",
            price: 11
        }
    ]
}

export default function WishList() {
    const {data: session} = useSession();
    const [wishList, setWishList] = useState(getMyWishList())
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        if (session?.user?.id) {
          fetch(`/api/wishlists?userID=${session.user.id}`)
            .then(response => response.json())
            .then(data => setWishList(data));
        }
      }, [session]);


    /**
     * Updates an item in the wish list.
     * @param index - The index of the item to update.
     * @param updatedItem - The updated item.
     */
    const getUpdateItemFunction = (id: string) => (updatedItem: ListItemProps) => {
        setWishList(wishList.map(item => item.id !== id ? item : {...updatedItem}));
    }

    /**
     * Adds a new item to the wishlist.
     * @param {string} newItemTitle - The title of the new item.
     */
    const addItem = (newItemTitle: string) => {
        if(newItemTitle && newItemTitle.trim()) {
            setWishList((prev) => [...prev, {id: uuidv4(), name: newItemTitle, note: "", price: NaN}])
        }

        setIsAdding(false)
    }

    const triggerAdd = () => setIsAdding(true)



    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
            {wishList.map((item) => (
                <ListItem key={item.id} id={item.id} name={item.name} note={item.note} price={item.price} updateItem={getUpdateItemFunction(item.id)} />
            ))}
            { !isAdding ? <AddItemButton onPress={triggerAdd} /> : <NewItemInput submitAction={addItem} /> }
        </main>
    );
}

