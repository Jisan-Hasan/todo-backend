import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signup),
  AuthController.signup,
);

router.post(
  '/signin',
  validateRequest(AuthValidation.signin),
  AuthController.signin,
);

export const AuthRoutes = router;
