import Router from 'express-promise-router';
import * as s from 'superstruct';
import web3 from 'web3';

import { validate } from '../middleware';
import { userService } from '../service/user';

const router = Router();

const getCategorySchema = {
  params: s.object({
    walletId: s.string(),
  }),
};

router.get(
  '/:walletId',
  validate(getCategorySchema),
  async (request, response) => {
    const { walletId } = request.params;

    if (!web3.utils.isAddress(walletId)) {
      return response.status(400).send({ message: 'Invalid wallet address' });
    }

    const user = await userService.get(walletId.toLowerCase());

    if (!user) {
      return response.status(404).send({ message: 'User not found' });
    }

    return response.status(200).send(user);
  }
);

export default router;
