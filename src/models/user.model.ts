import { ResultSetHeader } from 'mysql2';

import connection from './connection';
import { IUser, User } from '../interfaces';

export async function create(user: IUser): Promise<User> {
  const { username, classe, level, password } = user;

  const query = `INSERT INTO Trybesmith.Users
  (username, classe, level, password) VALUES (?, ?, ?, ?)`;
  const values = [username, classe, level, password];

  const [result] = await connection.execute<ResultSetHeader>(query, values);
  const { insertId: id } = result;

  const newUser: User = { id, username, classe, level, password };
  return newUser;
}

export async function getByUserName(username: string): Promise<User | null> {
  const query = 'SELECT * FROM Trybesmith.Users WHERE username = ?';
  const values = [username];

  const [data] = await connection.execute(query, values);
  const [user] = data as User[];

  return user || null;
}
