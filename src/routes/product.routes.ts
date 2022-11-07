import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
import validateProductBody from '../middlewares/product.validation';

const router = Router();

router.get('/', ProductController.getAll.bind(ProductController));
router.post('/', validateProductBody, ProductController.create.bind(ProductController));

export default router;