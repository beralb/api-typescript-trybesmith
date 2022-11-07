import Joi from 'joi';
import { RequestHandler } from 'express';

const validateProductBody: RequestHandler = (req, res, next) => {
  const { name, amount } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });

  const { error } = schema.validate({ name, amount });

  if (error) {
    const errorMessage = error.details[0].message;
    if (errorMessage.includes('must be')) {
      return res.status(422).json({ message: errorMessage });
    }
    return res.status(400).json({ message: errorMessage });
  }

  next();
};

export default validateProductBody;
