'use client'

import ListItem from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { UUID } from "crypto";
import WishList from "@/components/wishList";

export default function MyList() {
    return <WishList />
}