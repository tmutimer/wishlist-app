// db.js
import mongoose from 'mongoose';
import Wishlist, { IListItem } from './models/Wishlist';


export async function connectToDb() {
    const {MONGO_DB_USER: user, MONGO_DB_PASSWORD: password, MONGO_DB_URL: host} = process.env

    const MONGO_URI = `mongodb+srv://${user}:${password}@${host}`
    
    // if (process.env.DEV_MODE === 'true') seedTestData()

    if (mongoose.connection.readyState >= 1) {
        return; 
    }


    return mongoose.connect(MONGO_URI);
}

let runCount = 1

export function seedTestData() {

  console.log(`Seeding test data for ${runCount++} time`)

  const testWishList = new Wishlist({
    wishlistID: "123456",
    userID: "110498116089097592273", // This is a Google 'sub' ID
    listItems: [],
  })

  testWishList.listItems.push({
    name: "Test Item 1",
    note: "This is a test item",
    price: 10.00,
    reserved: false,
    reservedBy: ""
  } as IListItem)

  testWishList.save()

}