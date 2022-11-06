import { IProduct } from '../interfaces';
import * as productModel from '../models/product.model';

export async function create(product: IProduct) {
  const data = await productModel.create(product);
  return { status: 201, data };
}

export async function getAll() {
  const data = await productModel.getAll();
  return { status: 200, data };
}
