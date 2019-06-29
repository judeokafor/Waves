/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Joi from 'joi';

import mongoose from 'mongoose';
import errorHandler from '../lib/helpers/errorHandler';
import validation from '../lib/validations/product';
import Product from '../models/Product';

export default class productController {
  static async createArticle(req, res) {
    try {
      const {
        name,
        price,
        frets,
        description,
        brand,
        shipping,
        available,
        wood,
        sold,
        publish,
        images,
      } = req.body;
      const unique = await Product.findOne({ name });
      if (unique) {
        return res
          .status(400)
          .json({ success: false, message: 'Product already exist' });
      }
      const dataToValidate = {
        name,
        description,
        brand,
        shipping,
        available,
        wood,
        sold,
        publish,
        images,
        price: parseInt(price, 10),
        frets: parseInt(frets, 10),
      };
      const result = Joi.validate(dataToValidate, validation.product, {
        convert: false,
      });
      if (result.error === null) {
        const product = new Product(req.body);
        const doc = await product.save();
        return res.status(201).json({ success: true, product: doc });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      return errorHandler.tryCatchError(res, error);
    }
  }

  static async getAllProducts(req, res) {
    try {
      const doc = await Product.find({});
      return res.status(200).json({
        products: doc,
      });
    } catch (error) {
      return errorHandler.tryCatchError(res, error);
    }
  }

  static async getArticleById(req, res) {
    try {
      const { type } = req.query;
      let items = req.query.id;
      if (type === 'array') {
        const ids = items.split(',');
        items = [];
        items = ids.map(item => mongoose.Types.ObjectId(item));
      }
      const doc = await Product.find({ _id: { $in: items } })
        .populate('brand')
        .populate('wood')
        .exec();
      return res.status(200).json({
        products: doc,
      });
    } catch (error) {
      return errorHandler.tryCatchError(res, error);
    }
  }

  static async getArticleByOrder(req, res) {
    try {
      let { order, sortBy, limit } = req.query;
      order = order || 'asc';
      sortBy = sortBy || '_id';
      limit = parseInt(limit, 10) || 100;

      const doc = await Product.find()
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec();
      return res.status(200).json({
        articles: doc,
      });
    } catch (error) {
      return errorHandler.tryCatchError(res, error);
    }
  }
}
