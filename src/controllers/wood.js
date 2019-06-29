/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Joi from 'joi';

import errorHandler from '../lib/helpers/errorHandler';
import validation from '../lib/validations/wood';
import Wood from '../models/Wood';

export default class woodController {
  static async createWood(req, res) {
    try {
      const { name } = req.body;
      const unique = await Wood.findOne({ name });
      if (unique) {
        return res
          .status(400)
          .json({ success: false, message: 'Wood already exist' });
      }
      const result = Joi.validate(name, validation.wood, {
        convert: false,
      });
      if (result.error === null) {
        const wood = new Wood(req.body);
        const doc = await wood.save();
        return res.status(201).json({ success: true, wood: doc });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      return errorHandler.tryCatchError(res, error);
    }
  }

  static async getAllWoods(req, res) {
    try {
      const doc = await Wood.find({});
      return res.status(200).json({
        woods: doc,
      });
    } catch (error) {
      return errorHandler.tryCatchError(res, error);
    }
  }
}
