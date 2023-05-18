import { getModelForClass, prop } from '@typegoose/typegoose';

import { MongoBase } from './base';

export class Categories extends MongoBase {
  @prop()
  name!: string;

  @prop()
  places!: string[];
}

export const CategoriesModel = getModelForClass(Categories);

export type CategoriesData = Omit<Categories, keyof MongoBase>;
