import * as orderModel from '../models/order.model';

async function orderServiceGetAll() {
  const data = await orderModel.orderModelGetAll();
  return { status: 200, data };
}

export default { orderServiceGetAll };
