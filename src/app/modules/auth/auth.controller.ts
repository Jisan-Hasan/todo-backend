import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  await AuthService.signup(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Signup successful',
  });
});

export const AuthController = {
  signup,
};
