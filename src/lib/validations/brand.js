import Joi from 'joi';

export default class Brand {
  static get brand() {
    return Joi.string()
      .min(3)
      .max(150)
      .required();
  }
}
