import { Request, Response } from 'express';
import loginService from '../services/login.service';
import { ILogin } from '../interfaces/ILogin';

export async function login(req: Request<object, object, ILogin>, res: Response) {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: '"username" is required' });
  }

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  const token = await loginService(req.body);

  if (token.length === 0) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  return res.status(200).json({ token });
}

export default login;