'use client'

import ListItem from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useState } from "react";
import { randomUUID } from "crypto";





export default function MyList() {
    const [wishList, setWishList] = useState([{id: randomUUID, name: "Harry Potter and the Hard-coded List"}, {id: randomUUID, name: "Harry Potter and the Half-blood List"}])
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
            {wishList.map((item) => (
                <ListItem key={item.id} itemName={item.name} setWishList={setWishList}/>
            ))}
            <AddItemButton setWishList={setWishList}/>
        </main>
    );
}