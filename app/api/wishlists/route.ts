import { connectToDb } from "@/db";
import Wishlist from "@/models/Wishlist";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    await connectToDb();
    const userID = req.nextUrl.searchParams.get('userId')
    const data = await Wishlist.find({ userID: userID }).exec();
    // const data = mockData
    console.log("wishlist retrieved:", data)
    return Response.json(data)
}