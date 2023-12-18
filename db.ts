// db.js
import mongoose from 'mongoose';
import Wishlist from './models/Wishlist';


export async function connectToDb() {
    const {MONGO_DB_USER: user, MONGO_DB_PASSWORD: password, MONGO_DB_URL: host} = process.env

    const MONGO_URI = `mongodb+srv://${user}:${password}@${host}/`
    
    if (process.env.DEV_MODE === 'true') seedTestData()

    if (mongoose.connection.readyState >= 1) {
        return; 
    }


    return mongoose.connect(MONGO_URI);
}

export async function seedTestData() {
  console.log('seeding test data')

  const testWishList = new Wishlist({
    wishlistId: "123456",
    userId: "110498116089097592273", // This should be a Google 'sub' ID
    listItems: [
      {
        itemId: "1",
        name: "Item 1",
        note: "This is item 1",
        price: 100,
        url: "http://example.com/item1",
      },
      {
        itemId: "2",
        name: "Item 2",
        note: "This is item 2",
        price: 200,
      },
      {
        itemId: "3",
        name: "Item 3",
        note: "This is item 3",
        price: 300,
      },
    ],
  })
  await testWishList.save()

}