import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IListItem extends Document {
    itemId: string;
    name: string;
    note: string;
    price: number;
    url?: string;
    reserved: boolean;
    reservedBy?: string;
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
    url: { type: String },
    reserved: { type: Boolean, required: true, default: false },
    reservedBy: { type: String }
});

const WishlistSchema: Schema = new Schema({
    wishlistId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    listItems: [ListItemSchema]
});

export default mongoose.model<IWishlist>('Wishlist', WishlistSchema);
