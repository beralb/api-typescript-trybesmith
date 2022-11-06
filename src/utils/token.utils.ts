import jsonwebtoken from 'jsonwebtoken';

import { ILogin } from '../interfaces/ILogin';

import { IToken } from '../interfaces/IToken';

const jwt = jsonwebtoken;

// export function generateToken(data: ILogin) {
//   return jwt
//     .sign({ data }, process.env.JWT_SECRET as string, { algorithm: 'HS256', expiresIn: '1d' });
// }

const jwtSecret = process.env.JWT_SECRET;

export function generateToken(data: ILogin) {
  return jwt
    .sign({ data }, jwtSecret as string, { algorithm: 'HS256', expiresIn: '1d' });
}

export function validateToken(token: IToken) {
  console.log('🚀 ~ file: token.utils.ts ~ line 15 ~ validateToken ~ token', token);
  try {
    // const { data } = jwt.verify(token, process.env.JWT_SECRET);
    // return data;
  } catch (error) {
    const e = new Error('Token inválido');
    e.name = 'Não válido';
    throw e;
  }
}