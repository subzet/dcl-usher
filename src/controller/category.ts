import Router from 'express-promise-router';
import * as s from 'superstruct';

import { validate } from '../middleware';
import { categoryService } from '../service/category';

const router = Router();

const getCategorySchema = {
  params: s.object({
    name: s.string(),
  }),
};

router.get('/:name', validate(getCategorySchema), async (request, response) => {
  const { name } = request.params;

  const category = await categoryService.get(name);

  return response.status(200).send(category);
});

router.get('/', async (request, response) => {
  const categories = await categoryService.getAll();

  return response.status(200).send(categories);
});

export default router;
