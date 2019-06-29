/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Joi from 'joi';

import env from '../lib/config/env';
import errorHandler from '../lib/helpers/errorHandler';
import validation from '../lib/validations/user';
import User from '../models/User';

export default class userController {
  static async signUp(req, res) {
    try {
      const { email } = req.body;
      const result = Joi.validate(req.body, validation.userSchema, {
        convert: false,
      });
      if (result.error === null) {
        const existUser = await User.findOne({ email });
        if (!existUser) {
          req.body.avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
          const user = new User(req.body);
          await user.save();
          return res.status(201).json({ success: true });
        }
        return res
          .status(400)
          .json({ success: false, message: 'Email Already Exist' });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
  }
}
