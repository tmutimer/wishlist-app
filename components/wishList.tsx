'use client'

import ListItem, {ListItemProps} from "@/components/listItem"
import AddItemButton from "@/components/addItemButton";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import NewItemInput from "./newItemInput";
import { useSession } from "next-auth/react";
import { IListItem, IWishlist } from "@/models/Wishlist";
import { WishlistAPIResponse } from "@/app/api/wishlists/[userID]/route";
import { ListItemAPIResponse } from "@/app/api/wishlists/[userID]/items/route";
import { redirect } from "next/navigation";

export default function WishList() {
    const { data: session } = useSession()
    const [wishListItems, setWishListItems] = useState<ListItemProps[]>([]);
    const [isAdding, setIsAdding] = useState(false)
    const triggerAdd = () => setIsAdding(true)
    
    if (!session?.user?.id) {
        console.log("No session found, redirecting to login");
        redirect("/api/auth/signin")
    }

    useEffect(() => {
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
        }
    }, [session?.user?.id]); // Dependency array
    
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
    
    // update an item
    function updateItem(id: string, updatedItem: ListItemProps) { 
            setWishListItems(prev => prev.map(item => item.id !== id ? item : {...updatedItem}));
            saveWishlist()
    }

    // addItem is to be used
    function addItem (newItemTitle: string) {
        if(newItemTitle && newItemTitle.trim()) {
            const newId = uuidv4()
            try {
                setWishListItems((prev) => [...prev, {id: newId, name: newItemTitle, note: "", price: NaN, updateItem: updateItem}])
                saveWishlist()
            } catch (error) {
                console.log("Error adding item:", error);
            }
        }
        setIsAdding(false)
    }

     function saveWishlist() {        
        fetch(`/api/wishlists/${session.user.id}/`, {
            method: 'PATCH',
            body: JSON.stringify({
                //TODO make the reserved value dynamic
                listItems: wishListItems.map((item) => {
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
    }




}

