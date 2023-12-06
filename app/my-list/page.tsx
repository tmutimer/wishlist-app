'use client'

import ListItem from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';





export default function MyList() {
    const [wishList, setWishList] = useState([{id: uuidv4(), name: "Harry Potter and the Hard-coded List"}, {id: uuidv4(), name: "Harry Potter and the Half-blood List"}])
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
            {wishList.map((item) => (
                <ListItem key={item.id} id={item.id} itemName={item.name} setWishList={setWishList} isNew={false}/>
            ))}
            <AddItemButton setWishList={setWishList}/>
        </main>
    );
}