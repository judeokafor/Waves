import express from 'express';
import passport from 'passport';
import isAdmin from '../lib/middleware/admin';
import productController from '../controllers/product';

const router = express.Router();
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  productController.createArticle,
);
router.get('/', productController.getAllProducts);
router.get('/article_by_id', productController.getArticleById);
router.get('/articles', productController.getArticleByOrder);

export default router;
