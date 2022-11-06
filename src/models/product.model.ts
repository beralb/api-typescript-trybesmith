import { ResultSetHeader } from 'mysql2';
import connection from './connection';

import { IProduct, Product } from '../interfaces';

export async function create(product: IProduct): Promise<Product> {
  const { name, amount } = product;

  const query = `INSERT INTO Trybesmith.Products (name, amount)
    VALUES (?, ?)`;
  const values = [name, amount];

  const [result] = await connection.execute<ResultSetHeader>(query, values);
  const { insertId: id } = result;

  const newProduct: Product = { ...product, id };
  return newProduct;
}

export async function getAll(): Promise<Product[]> {
  const query = 'SELECT * FROM Trybesmith.Products';

  const [products] = await connection.execute(query);

  return products as Product[];
}
