import * as orderModel from '../models/order.model';
// import { IProductId } from '../interfaces';

export async function orderServiceGetAll() {
  const data = await orderModel.orderModelGetAll();
  return { status: 200, data };
}

export async function create(productsIds: number[], username: string) {
  const data = await orderModel.create(productsIds, username);
  return { status: 201, data };
}
