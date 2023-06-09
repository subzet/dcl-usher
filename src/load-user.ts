/* eslint-disable unicorn/no-process-exit */

import csv from 'csv-parser';
import fs from 'fs';

import { UserModel } from './model';
import { setupDatabase } from './util';

async function readCSVFile(filePath: string): Promise<object[]> {
  const results: object[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function main() {
  await setupDatabase();

  //This should be done in S3. This is just a quick way to load the data.
  const result = await readCSVFile('<PATH TO user_movements.csv FILE>');

  await Promise.all(
    result.map(async (userRow) => {
      const walletId = Object.values(userRow)[0];

      const user = await UserModel.findOne({ walletId });

      if (user) {
        return;
      }

      return UserModel.create({ walletId });
    })
  );
}

void main()
  .catch((error) => console.error(error))
  .then(() => process.exit());
