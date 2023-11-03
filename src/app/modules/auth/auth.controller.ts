import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ISigninUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  await AuthService.signup(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Signup successful',
  });
});

const signin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signin(req.body);

  const { refreshToken, accessToken } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ISigninUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Signin successful',
    data: { accessToken },
  });
});

export const AuthController = {
  signup,
  signin,
};
