// Mock data for list items
const listItems = [
    { id: 1, name: 'Item 1', note: 'Note 1', price: 10.99 },
    { id: 2, name: 'Item 2', note: 'Note 2', price: 19.99 },
    { id: 3, name: 'Item 3', note: 'Note 3', price: 5.99 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Return the list items
        res.status(200).json(listItems);
    } else {
        // Method not allowed
        res.status(405).end();
    }
}
import { NextApiRequest, NextApiResponse } from 'next';
