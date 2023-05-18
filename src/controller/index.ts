import Router from 'express-promise-router';

import category from './category';
import user from './user';

const router = Router();

router.use('/category', category);
router.use('/user', user);

export default router;
