import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get token from header
    const token = req.headers.authorization;
    // check if token exist
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // verify token
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

    // attach user to request object
    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
