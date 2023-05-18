import { connectToMongo } from './moongose';

export const setupDatabase = async (local = false) => {
  await connectToMongo(local);
};
