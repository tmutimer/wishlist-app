import { Schema, model, Document } from 'mongoose';

export interface IListItem extends Document {
    id: string;
    userId: string;
    name: string;
    note: string;
    price: number;
}

const listItemSchema = new Schema<IListItem>({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    note: { type: String, required: true },
    price: { type: Number, required: true },
});

const ListItem = model<IListItem>('ListItem', listItemSchema);

export default ListItem;
