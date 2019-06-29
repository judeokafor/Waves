import Joi from 'joi';

export default class Wood {
  static get wood() {
    return Joi.string()
      .min(3)
      .max(150)
      .required();
  }
}
