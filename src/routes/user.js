import express from 'express';
import passport from 'passport';
import userController from '../controllers/user';

const router = express.Router();
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.currentProfile,
);
router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userController.logOut,
);

export default router;
