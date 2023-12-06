'use client'
import { useState } from "react";
import ListItem from "./listItem";


export default function AddItemButton() {

    let [isAdding, setIsAdding] = useState(false)
    let [newItemName, setNewItemName] = useState(false)

    function handleClick() {
        setIsAdding(true)
    }

    function handleBlur() {
        setIsAdding(false)
    }

    function onSave() {
    }

    return (
        <div onBlur={handleBlur}>
            
            {isAdding ? <ListItem itemName="" isNew={true} /> : <button onClick={handleClick}>Add an item...</button>}
        </div>
    )
}