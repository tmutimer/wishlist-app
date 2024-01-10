import { connectToDb } from "@/db";
import Wishlist, { IListItem, IWishlist } from "@/models/Wishlist";
import { ListItemAPIResponse as ListItemAPISchema } from "./items/route";

// Contract for the response object
export interface WishlistAPIResponse {
  id: string;
  userID: string;
  listItems: ListItemAPISchema[];
}


export async function GET(req: Request, { params }) {
  console.log("/api/wishlists/userID/route.ts: GET)");
  await connectToDb();

  // get the user's wishlist
  const wishlistDoc = await Wishlist.findOne({userID: params.userID}).exec();
  if(!wishlistDoc) {
    return new Response("Wishlist not found", {status: 400}) as Response;
  }

  // extract the document into response schema
  const wishlistResponse: WishlistAPIResponse = {
    id: wishlistDoc._id,
    userID: wishlistDoc.userID,
    listItems: getListItemsforAPIResponse(wishlistDoc),
  }

  function getListItemsforAPIResponse(doc: IWishlist): ListItemAPISchema[] {
    return doc.listItems.map((item) => {
      return {
        id: item._id,
        name: item.name,
        note: item.note,
        price: item.price,
        reserved: item.reserved,
        reservedBy: item.reservedBy
      }
    })
  }

  // return the response
  let options = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Response(JSON.stringify(wishlistResponse), options) as Response;
}

// This is a PATCH instead of a PUT because listItems array counts as one property
export async function PATCH(req: Request, { params }) {
  console.log("api/wishlists/userID/route.ts: PUT")
  await connectToDb()
  console.log("params: ", params)

  let {listItems: updatedListItems}: {listItems: ListItemAPISchema[]} = await req.json()

  console.log("listItems: ", updatedListItems);
  
  let list: IWishlist = await Wishlist.findOne({userID: params.userID}).exec() as IWishlist
  if(!list) {
    console.log("Wishlist not found; creating new one");
    // create new wishlist
    const newList = await Wishlist.create({userID: params.userID})
    if(!(newList instanceof Wishlist)) {
      return new Response("Error creating new wishlist", {status: 500}) as Response
    }
    // set list to the new wishlist
    list = newList
  }

  // for each existing item, search for an updated one in our request and update it
  for (let i = 0; i < list.listItems.length; i++) {
    const existingListItem = list.listItems[i];
    const updatedItem = updatedListItems.find((item) => item.id === existingListItem._id)
    if(updatedItem) {
      existingListItem.name = updatedItem.name
      existingListItem.note = updatedItem.note
      existingListItem.price = updatedItem.price
      existingListItem.reserved = updatedItem.reserved
      existingListItem.reservedBy = updatedItem.reservedBy
    } else {
      // remove the listitem because it has been deleted
      list.listItems.splice(i, 1)
    }
  }

  // add any new items
  updatedListItems.forEach((item) => {
    const foundItem = list.listItems.find(existingItem => existingItem._id === item.id)
    if (!foundItem) {
      // MongooseArray push casts to ListItem subdocument automatically
      list.listItems.push({
        name: item.name,
        note: item.note,
        price: item.price,
        reserved: item.reserved,
        reservedBy: item.reservedBy
      } as IListItem)
    }
  })
  
  const savedDoc = await list.save()

  // confirm that the document was saved
  if(!(savedDoc instanceof Wishlist)) {
    return new Response("Error saving document", {status: 500}) as Response
  }

  return new Response("", {status: 200})
}