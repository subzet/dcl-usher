import { getModelForClass, prop } from '@typegoose/typegoose';

import { MongoBase } from './base';

export class User extends MongoBase {
  @prop()
  walletId!: string;
}

export const UserModel = getModelForClass(User);

export type UserData = Omit<User, keyof MongoBase>;
