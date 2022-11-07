import Joi from 'joi';
import { RequestHandler } from 'express';

const validateProductIds: RequestHandler = (req, res, next) => {
  const { productsIds } = req.body;

  const schema = Joi.object({
    productsIds: Joi.array().required().items(Joi.number().required()),
  });

  const { error } = schema.validate({ productsIds });

  if (error) {
    const errorMessage = error.details[0].message;
    if (errorMessage.includes('does not contain 1 required value')) {
      return res.status(422).json({ message: '"productsIds" must include only numbers' });
    }
    if (errorMessage.includes('must')) {
      return res.status(422).json({ message: errorMessage });
    }
    return res.status(400).json({ message: errorMessage });
  }

  next();
};

export default validateProductIds;