import { Router } from 'express';
import * as OrderController from '../controllers/order.controller';
import validateProductIds from '../middlewares/order.validation';
import { validateToken } from '../utils/token.utils';

const router = Router();

router.get('/', OrderController.orderGetAll.bind(OrderController));
router.post('/', validateToken, validateProductIds, OrderController.create);

export default router;
