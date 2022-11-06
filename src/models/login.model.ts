import { RowDataPacket, ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IUser } from '../interfaces/IUser';
import { ILogin } from '../interfaces/ILogin';

export async function getUserByEmailAndPassword(login: ILogin): Promise<IUser[]> {
  const { username, password } = login;
  const [user] = await connection.execute<(
  IUser[] & RowDataPacket[])>(
    'SELECT * FROM Trybesmith.Users WHERE username=? AND password=?',
    [username, password],
    );

  return user;
}

export async function create(user: IUser): Promise<IUser> {
  const { username, password } = user;
  // console.log(user);
  const result = await connection.execute<ResultSetHeader>(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [username, password],
  );
  const [dataInserted] = result;
  const { insertId } = dataInserted;
  return { id: insertId, ...user };
}
