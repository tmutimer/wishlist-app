'use client'

import ListItem from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { UUID } from "crypto";
import WishList from "@/components/wishList";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function MyList() {
    const { data: session }= useSession()

    if(session) {
        return <WishList />
    } else {
        redirect("/api/auth/signin")
    }

}