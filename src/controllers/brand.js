/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Joi from 'joi';

import errorHandler from '../lib/helpers/errorHandler';
import validation from '../lib/validations/brand';
import Brand from '../models/Brand';

export default class brandController {
  static async createBrand(req, res) {
    try {
      const { name } = req.body;
      const unique = await Brand.findOne({ name });
      if (unique) {
        return res
          .status(400)
          .json({ success: false, message: 'Brand already exist' });
      }
      const result = Joi.validate(name, validation.brand, {
        convert: false,
      });
      if (result.error === null) {
        const brand = new Brand(req.body);
        const doc = await brand.save();
        return res.status(201).json({ success: true, brand: doc });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      return errorHandler.tryCatchError(res, error);
    }
  }

  static async getAllBrands(req, res) {
    try {
      const doc = await Brand.find({});
      return res.status(200).json({
        brands: doc,
      });
    } catch (error) {
      return errorHandler.tryCatchError(res, error);
    }
  }
}
