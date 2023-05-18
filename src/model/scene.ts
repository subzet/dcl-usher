import { getModelForClass, prop } from '@typegoose/typegoose';

import { MongoBase } from './base';

export class Scene extends MongoBase {
  @prop()
  title!: string;
  @prop()
  description?: string;
  @prop()
  base!: string;
  @prop()
  parcels!: string[];
}

export const SceneModel = getModelForClass(Scene);

export type SceneData = Omit<Scene, keyof MongoBase>;
