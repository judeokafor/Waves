import Joi from 'joi';

export default class product {
  static get product() {
    return Joi.object({
      name: Joi.string()
        .max(100)
        .required(),
      description: Joi.string()
        .max(5000)
        .required(),
      price: Joi.number()
        .integer()
        .required(),
      brand: Joi.required(),
      shipping: Joi.required(),
      available: Joi.required(),
      wood: Joi.required(),
      frets: Joi.number()
        .integer()
        .required(),
      sold: Joi.number().integer(),
      publish: Joi.required(),
      images: Joi.array(),
    });
  }
}
