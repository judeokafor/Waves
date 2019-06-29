import express from 'express';
import passport from 'passport';
import isAdmin from '../lib/middleware/admin';
import brandController from '../controllers/brand';

const router = express.Router();
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  brandController.createBrand,
);
router.get('/', brandController.getAllBrands);

export default router;
