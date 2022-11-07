import { Request, Response } from 'express';

import * as orderService from '../services/order.service';

export async function orderGetAll(_req: Request, res: Response) {
  const { status, data } = await orderService.orderServiceGetAll();
  res.status(status).json(data);
}

export async function create(req: Request, res: Response) {
  const { productsIds, user: { data: { username } } } = req.body;
  const { status, data } = await orderService
    .create(productsIds as number[], username as string);

  res.status(status).json(data);
}
