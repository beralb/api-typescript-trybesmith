import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';
import * as userModel from '../models/user.model';
import { secret, config } from '../middlewares/jwtConfig';

const MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Invalid email or password',
  USER_EXISTS: 'User already exists',
  FORBIDDEN: 'You are not allowed to take this action',
};

async function create(user: IUser) {
  const userExists = await userModel.getByUserName(user.username);
  if (userExists) {
    return { status: 400, error: { message: MESSAGES.USER_EXISTS } };
  }

  const payload = await userModel.create(user);
  const token = jwt.sign({ payload }, secret, config);
  const data = { token, ...payload };
  return { status: 201, data };
}

export default { create };
