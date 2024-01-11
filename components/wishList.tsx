'use client'

import ListItem, {ListItemProps} from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useCallback, useEffect, useRef, useState } from "react";
import NewItemInput from "./newItemInput";
import { useSession } from "next-auth/react";
import { ListItemAPIResponse } from "@/app/api/wishlists/[userID]/items/route";
import { redirect } from "next/navigation";

export default function WishList() {
    const { data: session } = useSession()
    const [wishListItems, setWishListItems] = useState<ListItemProps[]>([]);
    const [isAdding, setIsAdding] = useState(false)
    const triggerAdd = () => setIsAdding(true)
    const [refreshRequired, setRefreshRequired] = useState(true)

    
    if (!session?.user?.id) {
        console.log("No session found, redirecting to login");
        redirect("/api/auth/signin")
    }

    useEffect(() => {
        console.log("Wishlist useEffect called");
        
        const fetchWishlist = async () => {
            console.log("Fetching wishlist data");
    
            try {
                const response = await fetch(`/api/wishlists/${session.user.id}/`);
                const wishlistData = await response.json();
                const listItems = wishlistData.listItems.map((item: ListItemAPIResponse) => ({
                    id: item.id,
                    name: item.name,
                    note: item.note,
                    price: item.price,
                }));
    
                setWishListItems(listItems);
            } catch (error) {
                console.log("Fetching error:", error);
            }
        };
    
        // Check if session is available and then call the function
        if (session?.user?.id) {
            fetchWishlist();
            setRefreshRequired(false)
        }
    }, [session?.user?.id, refreshRequired]); // Dependency array

    async function saveWishlist(updatedWishListItems: ListItemProps[]) { 
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
            { !isAdding ? <AddItemButton onPress={triggerAdd} /> : <NewItemInput submitAction={addItem} /> }
        </main>
    )

    function updateItem(id: string, updatedItem: ListItemProps) { 
        console.log("Updating item:", id, updatedItem);
        const updatedWishListItems = wishListItems.map(item => item.id !== id ? item : {...updatedItem})

        setWishListItems(updatedWishListItems);
        saveWishlist(updatedWishListItems)
        setRefreshRequired(true)
    }

    async function addItem (newItemTitle: string) {
        console.log("Adding item:", newItemTitle);
        
        if(newItemTitle && newItemTitle.trim()) {
            try {
                // temp id is used to allow the item to be added to the list before the server responds
                const updatedWishListItems = [...wishListItems, {id: "temp", name: newItemTitle, updateItem: updateItem}]
                setWishListItems(updatedWishListItems)
                saveWishlist(updatedWishListItems)
                setRefreshRequired(true)
            } catch (error) {
                console.log("Error adding item:", error);
            }
        }
        setIsAdding(false)
    }








}

