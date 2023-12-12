
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
