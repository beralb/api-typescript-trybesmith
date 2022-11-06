import { Request, Response } from 'express';

// import { IProduct } from '../interfaces';
import orderService from '../services/order.service';

async function orderGetAll(_req: Request, res: Response) {
  const { status, data } = await orderService.orderServiceGetAll();
  res.status(status).json(data);
}

export default { orderGetAll };
