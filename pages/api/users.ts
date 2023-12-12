import { NextApiRequest, NextApiResponse } from 'next';
import { userController } from '../../controllers/userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Call the appropriate method in the userController based on the request method
    if (req.method === 'GET') {
      const users = await userController.getAllUsers();
      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const newUser = await userController.createUser(req.body);
      res.status(201).json(newUser);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
