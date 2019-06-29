import Joi from 'joi';

export default class User {
  static get userSchema() {
    return Joi.object({
      name: Joi.string()
        .max(100)
        .required(),
      lastname: Joi.string()
        .max(100)
        .required(),
      email: Joi.string()
        .email()
        .min(3)
        .max(150)
        .trim()
        .required(),
      password: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),
      isAdmin: Joi.string(),
    });
  }
}
