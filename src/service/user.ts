import { User, UserModel } from '../model';

class UserService {
  public get = async (walletId: string): Promise<User | null> => {
    return UserModel.findOne({
      walletId,
    });
  };
}

export const userService = new UserService();
