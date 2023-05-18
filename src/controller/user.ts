import Router from 'express-promise-router';
import * as s from 'superstruct';
import web3 from 'web3';

import { validate } from '../middleware';
import { userService } from '../service/user';

const router = Router();

const getUserSchema = {
  params: s.object({
    walletId: s.string(),
  }),
};

router.get('/:walletId', validate(getUserSchema), async (request, response) => {
  const { walletId } = request.params;

  if (!web3.utils.isAddress(walletId)) {
    return response.status(400).send({ message: 'Invalid wallet address' });
  }

  const user = await userService.get(walletId.toLowerCase());

  if (!user) {
    return response.status(404).send({ message: 'User not found' });
  }

  return response.status(200).send(user);
});

router.get(
  '/:walletId/recommendation',
  validate(getUserSchema),
  async (request, response) => {
    const { walletId } = request.params;

    if (!web3.utils.isAddress(walletId)) {
      return response.status(400).send({ message: 'Invalid wallet address' });
    }

    const tiles = await userService.recommend(walletId.toLowerCase());

    return response.status(200).send(tiles);
  }
);

export default router;
