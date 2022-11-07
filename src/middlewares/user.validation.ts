import Joi from 'joi';
import { RequestHandler } from 'express';

const validateUserBody: RequestHandler = (req, res, next) => {
  const { username, classe, level, password } = req.body;

  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().min(1).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate({ username, classe, level, password });

  if (error) {
    const errorMessage = error.details[0].message;
    if (errorMessage.includes('must be')) {
      return res.status(422).json({ message: errorMessage });
    }
    return res.status(400).json({ message: errorMessage });
  }

  next();
};

export default validateUserBody;
