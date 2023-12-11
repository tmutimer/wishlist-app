import ListItem, {ListItemProps} from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import NewItemInput from "./newItemInput";

const getMyWishList  = () => {
    return [
        {
            id: uuidv4(), 
            name: "Harry Potter and the Hard-coded List", 
            note: "It's good"}, 
        {
            id: uuidv4(), 
            name: "Harry Potter and the Half-blood List", 
            note: "Get on Amazon"
        }
    ]
}

export default function WishList() {
    //load wishlist and add additional front end props
    const [wishList, setWishList] = useState(getMyWishList()) 
    const [isAdding, setIsAdding] = useState(false)

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
            setWishList((prev) => [...prev, {id: uuidv4(), name: newItemTitle, note: ""}])
        }

        setIsAdding(false)
    }

    const triggerAdd = () => setIsAdding(true)



    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
            {wishList.map((item) => (
                <ListItem key={item.id} id={item.id} name={item.name} note={item.note} updateItem={getUpdateItemFunction(item.id)} />
            ))}
            { !isAdding ? <AddItemButton onPress={triggerAdd} /> : <NewItemInput submitAction={addItem} /> }
        </main>
    );
}

