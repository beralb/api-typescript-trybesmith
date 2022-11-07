import { Router } from 'express';

import userControllers from '../controllers/user.controller';
import validateUserBody from '../middlewares/user.validation';

const router = Router();

router.post('/', validateUserBody, userControllers.create);

export default router;
