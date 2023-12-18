import { connectToDb } from "@/db";
import Wishlist, { IWishlist } from "@/models/Wishlist";
import { NextApiRequest, NextApiResponse } from "next";
import { ListItemAPIResponse } from "./items/route";

// Contract for the response object
export interface WishlistAPIResponse {
  id: string;
  userID: string;
  listItems: ListItemAPIResponse[];
}


export async function GET(req: NextApiRequest, res: NextApiResponse) {
   
  // Retrieve the wishlist from the database
  await connectToDb();
  const userID = req.query.userID as string;

  const wishlistDoc = await Wishlist.findOne({userID: userID}).exec();

  if(!wishlistDoc) {
    res.status(404).json({error: "Wishlist not found"})
    return;
  }

  // extract the document into response object
  const wishlistResponse: WishlistAPIResponse = {
    id: wishlistDoc._id,
    userID: wishlistDoc.userID,
    listItems: getListItemsforAPIResponse(wishlistDoc),
  }

  function getListItemsforAPIResponse(doc: IWishlist) {
    return doc.listItems.map((item) => {
      return {
        id: item._id,
        name: item.name,
        price: item.price,
        reserved: item.reserved,
        reservedBy: item.reservedBy
      }
    })
  }

  res.status(200).json(wishlistResponse);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    await connectToDb()
    const wishlistID = req.query.wishlistID as string;
    const updatedFields = req.body
    const wishlist = await Wishlist.findByIdAndUpdate(wishlistID, updatedFields, {new: true})
    res.status(200).json(wishlist)
}