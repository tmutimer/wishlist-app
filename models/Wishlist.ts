import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IListItem extends Document {
    itemID: string;
    name: string;
    note?: string;
    price?: number;
    reserved: boolean;
    reservedBy?: string;
}

export interface IWishlist extends Document {
    wishlistID: string;
    userID: IUser['googleId'];
    listItems: IListItem[];
}

const ListItemSchema: Schema = new Schema({
    itemID: { type: String, required: true },
    name: { type: String, required: true },
    note: { type: String, required: false },
    price: { type: Number, required: false },
});

const WishlistSchema: Schema = new Schema({
    wishlistID: { type: String, required: true, unique: true },
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    listItems: [ListItemSchema]
});

let Wishlist: Model<IWishlist>;
try {
  Wishlist = mongoose.model('Wishlist') as Model<IWishlist>
} catch (error) {
  Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);
}

export default Wishlist;
