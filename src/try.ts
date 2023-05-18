/* eslint-disable unicorn/no-process-exit */
import {} from '.';
import { CategoriesModel } from './model';
import { categoryService } from './service/category';
import { placesService } from './service/places';
import { setupDatabase } from './util';

setupDatabase();

async function main() {
  await setupDatabase();

  console.log(await categoryService.get('virtual'));
}

void main()
  .catch((error) => console.error(error))
  .then(() => process.exit());
