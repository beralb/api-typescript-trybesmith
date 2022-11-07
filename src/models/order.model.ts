import { ResultSetHeader } from 'mysql2';
import connection from './connection';
// import { IOrder, Order } from '../interfaces';
import { Order, IOrderInsert, User } from '../interfaces';

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

// export async function create(productsIds: IProductId[], username: string): Promise<IOrderInsert> {
export async function create(productsIds: number[], username: string): Promise<IOrderInsert> {
  const usernameQuery = 'SELECT * FROM Trybesmith.Users WHERE username = ?';
  const values = [username];

  const [userData] = await connection.execute(usernameQuery, values);

  const [user] = userData as User[];
  console.log('🚀 ~ file: order.model.ts ~ line 28 ~ create ~ user', user.id);

  const insertOrderQuery = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
  const [orderData] = await connection.execute<ResultSetHeader>(insertOrderQuery, [user.id]);
  const { insertId: orderId } = orderData;

  productsIds.forEach(async (eachProductId) => connection.execute(
    `UPDATE Trybesmith.Products SET orderId = ${orderId} WHERE id = ?`,
    [eachProductId],
  ));

  const insertedOrder = { userId: user.id, productsIds };
  return insertedOrder as IOrderInsert;
}
