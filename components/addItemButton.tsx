'use client'
import { useState } from "react";
import ListItem from "./listItem";


export default function AddItemButton({setWishList}: any) {

    let [isAdding, setIsAdding] = useState(false)
    let [newItemName, setNewItemName] = useState(false)

    function handleClick() {
        setIsAdding(true)
    }

    function handleBlur() {
        setIsAdding(false)
    }

    return (
        <div onBlur={handleBlur}>
            
            {isAdding ? <ListItem id="" itemName="" isNew={true} setWishList={setWishList}/> : <button onClick={handleClick}>Add an item...</button>}
        </div>
    )
}