'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const user_model_1 = require('../user/user.model');
const signup = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    // check if user already exists with this email
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
      throw new ApiError_1.default(
        http_status_1.default.CONFLICT,
        'User already exists with this email',
      );
    }
    // hash user password
    payload.password = yield bcrypt_1.default.hash(
      payload.password,
      Number(config_1.default.bcrypt_salt_rounds),
    );
    // create user
    yield user_model_1.User.create(payload);
  });
const signin = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    // find user by email
    const user = yield user_model_1.User.findOne({ email: payload.email });
    // check if user exists
    if (!user) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        "User doesn't exists with this email",
      );
    }
    // check if password is correct
    const isPasswordCorrect = yield bcrypt_1.default.compare(
      payload.password,
      user.password,
    );
    // throw error if password is incorrect
    if (!isPasswordCorrect) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Incorrect password',
      );
    }
    // generate access token token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { email: user.email },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in,
    );
    // generate refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { email: user.email },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in,
    );
    // return access token and refresh token
    return {
      accessToken,
      refreshToken,
    };
  });
exports.AuthService = {
  signup,
  signin,
};
