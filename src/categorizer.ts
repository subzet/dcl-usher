import dotenv from 'dotenv';
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';

import { CategoriesModel } from './model';
import { delay, setupDatabase } from './util';
import { concurrent } from './util/concurrent';

dotenv.config();

interface Place {
  PLACE_ID: string;
  DESCRIPTION: string;
  TAGS: string;
  USER_VISITS: number;
  BASE_POSITION: string;
}

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const prePrompt = `I need your help coming up with categories for a given set of descriptions. I will give you each description and you will have to come up with a category for it.`;

const initOpenAi = async () => {
  console.log('Initializing open ai');

  await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: prePrompt }],
  });
};

const getCategories = async (place: Place) => {
  console.log(`Getting category for description ${place.DESCRIPTION}`);

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Just give me a single world description for the following description. If you can output more than one category, just do it separated by comma. Description is: ${place.DESCRIPTION}`,
      },
    ],
  });

  return completion.data.choices[0].message?.content.split(',');
};

const main = async () => {
  await setupDatabase();

  const places: Place[] = JSON.parse(
    fs.readFileSync('<path to places.json file>', 'utf8')
  );

  await initOpenAi();

  const errors: Place[] = [];

  await concurrent(
    places,
    async (place) => {
      console.log(`Waiting 1 second to insert place ${place.PLACE_ID}`);
      await delay(1000);

      try {
        const categoriesRaw = await getCategories(place);

        if (!categoriesRaw) {
          return;
        }

        for (const category of categoriesRaw) {
          const categoryName = category.trim().toLowerCase();

          const categoryObject = await CategoriesModel.findOne({
            name: categoryName,
          });

          if (!categoryObject) {
            await CategoriesModel.create({
              name: categoryName,
              places: [place.PLACE_ID],
            });
          }

          await categoryObject?.update({
            places: [...categoryObject.places, place.PLACE_ID],
          });
        }

        await delay(1000);
      } catch {
        errors.push(place);
      }
    },
    { concurrency: 1 }
  );

  fs.writeFileSync(`./src/files/errors.json`, JSON.stringify(errors));
};

main();
