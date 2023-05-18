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

  const result = await readCSVFile('<path to user_movement.csv file>');

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
