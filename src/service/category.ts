/* eslint-disable sonarjs/no-identical-functions */
import { Categories, CategoriesModel } from '../model';
import { placesService } from './places';

class CategoryService {
  public getAll = async (): Promise<Categories[]> => {
    const categories = await CategoriesModel.find();

    if (!categories) {
      return [];
    }

    return categories
      .map((category) => {
        return { ...category.toJSON(), name: category.name.replace('/', '-') };
      })
      .sort((a, b) => (a.places.length > b.places.length ? -1 : 1));
  };

  public get = async (name: string): Promise<Record<string, any> | void> => {
    const category = await CategoriesModel.findOne({
      name: name.replace('-', '/'),
    });

    if (!category) {
      return {};
    }

    const placesData = await Promise.all(
      category.places.map(async (placeId) => {
        try {
          return await placesService.getPlace(placeId);
        } catch (error) {
          console.log(error);
          return;
        }
      })
    );

    return {
      name: category.name.replace('/', '-'),
      places: placesData.filter((place) => !!place),
    };
  };

  public getById = async (
    categoryId: string
  ): Promise<Record<string, any> | void> => {
    const category = await CategoriesModel.findById(categoryId);

    if (!category) {
      return {};
    }

    const placesData = await Promise.all(
      category.places.map(async (placeId) => {
        try {
          return await placesService.getPlace(placeId);
        } catch (error) {
          console.log(error);
          return;
        }
      })
    );

    return {
      name: category.name.replace('/', '-'),
      places: placesData.filter((place) => !!place),
    };
  };
}

export const categoryService = new CategoryService();
