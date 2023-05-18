/* eslint-disable unicorn/no-process-exit */

import fs from 'fs';

import { SceneModel } from './model/scene';
import { setupDatabase } from './util';

async function main() {
  await setupDatabase();

  const fileData = JSON.parse(fs.readFileSync('path to scenes.json', 'utf8'));

  await SceneModel.insertMany(fileData);
}

void main()
  .catch((error) => console.error(error))
  .then(() => process.exit());
