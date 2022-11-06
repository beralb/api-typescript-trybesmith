import { ResultSetHeader } from 'mysql2';
import connection from './connection';

import { IOrder, Order } from '../interfaces';

export async function orderModelGetAll(): Promise<Order[]> {
  const query = `SELECT o.id, o.userId,
    JSON_ARRAYAGG(p.id) AS productsIds
    FROM Trybesmith.Orders AS o
    INNER JOIN 
      Trybesmith.Products AS p
    ON o.id = p.orderId
    GROUP BY o.id;`;

  const [orders] = await connection.execute(query);

  return orders as Order[];
}

export async function create(order: IOrder): Promise<Order> {
  const { userId } = order;

  const query = `INSERT INTO Trybesmith.Orders (name, amount)
    VALUES (?, ?)`;
  const values = [userId];

  const [result] = await connection.execute<ResultSetHeader>(query, values);
  const { insertId: id } = result;

  const newOrder: Order = { ...order, id };
  return newOrder;
}
