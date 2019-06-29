import express from 'express';
import passport from 'passport';
import isAdmin from '../lib/middleware/admin';
import brandController from '../controllers/brand';

const router = express.Router();
router.post(
  '/brand',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  brandController.createBrand,
);
router.get('/brand', brandController.getAllBrands);

export default router;
