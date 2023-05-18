import Router from 'express-promise-router';
import * as s from 'superstruct';

import { validate } from '../middleware';
import { categoryService } from '../service/category';

const router = Router();

const getCategorySchema = {
  params: s.object({
    id: s.string(),
  }),
};

router.get('/:id', validate(getCategorySchema), async (request, response) => {
  const { id } = request.params;

  const category = await categoryService.getById(id);

  return response.status(200).send(category);
});

router.get('/', async (_request, response) => {
  const categories = await categoryService.getAll();

  return response.status(200).send(categories);
});

export default router;
