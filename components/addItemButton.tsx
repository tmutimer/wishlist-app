'use client'
import { useState } from "react";
import ListItem from "./listItem";


export default function AddItemButton({onPress}: {onPress: Function}) {

    let [newItemName, setNewItemName] = useState(false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPress()
    }

    return (
        <button onClick={handleClick}>Add an item...</button>
    )
}
