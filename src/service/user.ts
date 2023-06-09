import { User, UserModel } from '../model';
import { UserSuggestionModel } from '../model/user-suggestion';
import { sceneService } from './scene';

class UserService {
  public get = async (walletId: string): Promise<User | null> => {
    return UserModel.findOne({
      walletId,
    });
  };

  public recommend = async (walletId: string) => {
    const userSuggestion = await UserSuggestionModel.findOne({
      walletId,
    });

    if (!userSuggestion) {
      return [];
    }

    const scenes = await Promise.all(
      userSuggestion.tiles.map((tile) => {
        return sceneService.getFromCatalyst(tile);
      })
    );

    return scenes.filter((scene) => !!scene);
  };
}

export const userService = new UserService();
