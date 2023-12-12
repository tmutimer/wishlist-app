import { connectToDb } from "@/db";
import Wishlist from "@/models/Wishlist";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await connectToDb();
    const wishlistID = req.query.wishlistID as string;
    const wishlist = await Wishlist.findById(wishlistID);
    res.status(200).json(wishlist);
  }

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
    await connectToDb()
    const wishlistID = req.query.wishlistID as string;
    const updatedFields = req.body
    const wishlist = await Wishlist.findByIdAndUpdate(wishlistID, updatedFields, {new: true})
    res.status(200).json(wishlist)
}