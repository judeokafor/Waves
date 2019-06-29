import express from 'express';
import passport from 'passport';
import userController from '../controllers/user';

const router = express.Router();
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

export default router;
