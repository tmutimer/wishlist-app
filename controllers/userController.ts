import User, {IUser} from '../models/User';


class UserController {
    async getAllUsers() {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw new Error(String(error));
      }
    }
  
    async createUser(userData: IUser) {
      try {
        const user = new User(userData);
        await user.save();
        return user;
      } catch (error) {
        throw new Error(String(error));
      }
    }
  }
  
  export const userController = new UserController();