import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ISigninUser } from './auth.interface';

const signup = async (payload: IUser) => {
  // check if user already exists with this email
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User already exists with this email',
    );
  }

  // hash user password
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  // create user
  await User.create(payload);
};

const signin = async (payload: ISigninUser) => {
  // find user by email
  const user = await User.findOne({ email: payload.email });

  // check if user exists
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User doesn't exists with this email",
    );
  }

  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password,
  );

  // throw error if password is incorrect
  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  // generate access token token
  const accessToken = jwtHelpers.createToken(
    { email: user.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  // generate refresh token
  const refreshToken = jwtHelpers.createToken(
    { email: user.email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  // return access token and refresh token
  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  signup,
  signin,
};
