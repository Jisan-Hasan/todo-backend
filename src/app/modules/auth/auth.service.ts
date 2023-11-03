import config from '../../../config';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';

const signup = async (payload: IUser) => {
  // hash user password
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  // create user
  await User.create(payload);
};

export const AuthService = {
  signup,
};
