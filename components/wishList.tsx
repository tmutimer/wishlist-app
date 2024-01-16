'use client'

import ListItem, {ListItemProps} from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import NewItemInput from "./newItemInput";
import { ListItemAPIResponse } from "@/app/api/wishlists/[userID]/items/route";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface WishListUser extends Session {
    user: {
        id: string
        name: string
    }
}

export default function WishList() {
    const { data: session } = useSession() as { data: WishListUser | null };
    const [wishListItems, setWishlistItems] = useState<ListItemProps[]>([]);
    const [isAdding, setIsAdding] = useState(false)
    const startAddingListItem = () => setIsAdding(true)
    const [refreshRequired, setRefreshRequired] = useState(true)

    
    if (!session?.user?.id) {
        console.log("No session found, redirecting to login");
        redirect("/api/auth/signin")
    }

    useEffect(() => {
        
        const fetchWishlist = async () => {
    
            try {
                const response = await fetch(`/api/wishlists/${session.user.id}/`);
                const wishlistData = await response.json();
                const listItems = wishlistData.listItems.map((item: ListItemAPIResponse) => ({
                    id: item.id,
                    name: item.name,
                    note: item.note,
                    price: item.price,
                }));
    
                setWishlistItems(listItems);
            } catch (error) {
                console.log("Fetching error:", error);
            }
        };
    
        if (session?.user?.id) {
            fetchWishlist();
            setRefreshRequired(false)
        }
    }, [session?.user?.id, refreshRequired]);

    async function saveWishlist(updatedWishListItems: ListItemProps[]) {
        if(!session?.user?.id) {
            console.log("No session found, redirecting to login");
            redirect("/api/auth/signin")
        }
        let response = await fetch(`/api/wishlists/${session.user.id}/`, {
            method: 'PATCH',
            body: JSON.stringify({
                //TODO make the reserved value dynamic
                listItems: updatedWishListItems.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        note: item.note,
                        price: item.price,
                        reserved: false
                    }
                })
            })
        })
        return response
    }

    
    if (!wishListItems) {
        return <div>Loading...</div>
    }    

    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
            {wishListItems && wishListItems.map((item) => (            
                <ListItem key={item.id} id={item.id} name={item.name} note={item.note} price={item.price} updateItem={updateItem} />
                ))}
            { !isAdding ? <AddItemButton onPress={startAddingListItem} /> : <NewItemInput submitAction={addListItem} /> }
        </main>
    )

    function updateItem(id: string, updatedItem: ListItemProps) { 
        console.log("Updating item:", id, updatedItem);
        const updatedWishListItems = wishListItems.map(item => item.id !== id ? item : {...updatedItem})

        setWishlistItems(updatedWishListItems);
        saveWishlist(updatedWishListItems)
        setRefreshRequired(true)
    }

    async function addListItem (newItemTitle: string) {
        console.log("Adding item:", newItemTitle);
        
        if(newItemTitle && newItemTitle.trim()) {
            try {
                // temp ID is quickly replaced by the real ID from the server
                const updatedWishListItems = [...wishListItems, {id: "temp", name: newItemTitle, updateItem: updateItem}]
                setWishlistItems(updatedWishListItems)
                saveWishlist(updatedWishListItems)
                setRefreshRequired(true)
            } catch (error) {
                console.log("Error adding item:", error);
            }
        }
        setIsAdding(false)
    }








}

