import { getModelForClass, prop } from '@typegoose/typegoose';

import { MongoBase } from './base';

export class UserSuggestion extends MongoBase {
  @prop()
  walletId!: string;

  @prop()
  tiles!: string[];
}

export const UserSuggestionModel = getModelForClass(UserSuggestion);

export type UserSuggestionData = Omit<UserSuggestion, keyof MongoBase>;
