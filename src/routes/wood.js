import express from 'express';
import passport from 'passport';
import isAdmin from '../lib/middleware/admin';
import woodController from '../controllers/wood';

const router = express.Router();
router.post(
  '/wood',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  woodController.createWood,
);
router.get('/woods', woodController.getAllWoods);

export default router;
