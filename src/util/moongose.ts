import mongoose from 'mongoose';

import { environment } from './environment';

export const connectToMongo = async (local: boolean) => {
  await mongoose.disconnect().catch(() => void 0);

  await mongoose.connect(
    local
      ? environment.MONGO_DATABASE_URL_LOCAL
      : environment.MONGO_DATABASE_URL
  );
};
