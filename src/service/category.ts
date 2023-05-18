import { Categories, CategoriesModel } from '../model';
import { placesService } from './places';

class CategoryService {
  public getAll = async (): Promise<Categories[]> => {
    const categories = await CategoriesModel.find();

    if (!categories) {
      return [];
    }

    return categories.map((category) => {
      return category.toJSON();
    });
  };

  public get = async (name: string): Promise<Record<string, any> | void> => {
    const category = await CategoriesModel.findOne({ name });

    if (!category) {
      return {};
    }

    const placesData = await Promise.all(
      category.places.map(async (placeId) => {
        return await placesService.getPlace(placeId);
      })
    );

    return {
      name: category.name,
      places: placesData,
    };
  };
}

export const categoryService = new CategoryService();
