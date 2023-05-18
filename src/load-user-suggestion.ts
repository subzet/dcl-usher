/* eslint-disable unicorn/no-process-exit */

import csv from 'csv-parser';
import fs from 'fs';

import { UserSuggestionModel } from './model/user-suggestion';
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
  const result = await readCSVFile('<path to user suggestion.csv>');

  await Promise.all(
    result.map(async (userRow) => {
      const walletId = Object.values(userRow)[0];

      const tiles: string[] = (
        Object.values(userRow)[1].split(' ') as string[]
      ).map((tile) => tile.replace('|', ','));

      await UserSuggestionModel.findOneAndUpdate(
        { walletId },
        { tiles },
        { upsert: true }
      );
    })
  );
}

void main()
  .catch((error) => console.error(error))
  .then(() => process.exit());
