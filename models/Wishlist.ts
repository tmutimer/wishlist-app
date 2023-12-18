import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './User';

export interface IListItem extends Document {
    itemId: string;
    name: string;
    note: string;
    price: number;
}

export interface IWishlist extends Document {
    wishlistId: string;
    userId: IUser['googleId'];
    listItems: IListItem[];
}

const ListItemSchema: Schema = new Schema({
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    note: { type: String, required: true },
    price: { type: Number, required: true },
});

const WishlistSchema: Schema = new Schema({
    wishlistId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    listItems: [ListItemSchema]
});

let Wishlist: Model<IWishlist>;
try {
  Wishlist = mongoose.model('Wishlist') as Model<IWishlist>
} catch (error) {
  Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);
}

export default Wishlist;
