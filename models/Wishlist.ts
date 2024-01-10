import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IListItem extends Document {
    name: string;
    note?: string;
    price?: number;
    reserved: boolean;
    reservedBy?: string;
}

export interface IWishlist extends Document {
  userID: string;
  listItems: IListItem[];
}

const ListItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    note: { type: String, required: false },
    price: { type: Number, required: false },
    reserved: { type: Boolean, required: true },
    reservedBy: { type: String, required: false }
});

const WishlistSchema: Schema = new Schema({
    userID: {type: String},
    listItems: [ListItemSchema]
});

let Wishlist: Model<IWishlist>;
try {
  Wishlist = mongoose.model('Wishlist') as Model<IWishlist>
} catch (error) {
  Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);
}

export default Wishlist;
