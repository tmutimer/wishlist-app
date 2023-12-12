import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "@/db";
import Wishlist from "@/models/Wishlist";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    await connectToDb();
    const userID = req.query.userID as string;
    const wishlist = await Wishlist.find({ userID: userID });
    res.status(200).json(wishlist);
}