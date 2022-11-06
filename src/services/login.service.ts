import { ILogin } from '../interfaces/ILogin';
import * as loginModel from '../models/login.model';
import { generateToken } from '../utils/token.utils';

export async function login(loginBody: ILogin) {
  const data = await loginModel.getUserByEmailAndPassword(loginBody);

  if (data.length === 0) {    
    return data;
  }

  return generateToken(loginBody);
}

export default login;
