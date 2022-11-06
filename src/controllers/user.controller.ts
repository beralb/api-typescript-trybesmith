import { Request, Response } from 'express';

import { IUser } from '../interfaces';
import userService from '../services/user.service';

async function create(req: Request, res: Response) {
  const user = req.body as IUser;
  const { status, data, error } = await userService.create(user);

  return error
    ? res.status(status).json({ error })
    : res.status(status).json(data);
}

export default { create };
