'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthValidation = void 0;
const zod_1 = require('zod');
const signup = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: zod_1.z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 character.')
      .max(12, 'Password must be at most 12 character.'),
    name: zod_1.z
      .string({ required_error: 'Name is Required' })
      .min(3, 'Name must be at least 3 character')
      .max(20, 'Name must be at most 20 character'),
  }),
});
const signin = zod_1.z.object({
  body: zod_1.z.object({
    email: zod_1.z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: zod_1.z.string({ required_error: 'Password is required' }),
  }),
});
exports.AuthValidation = {
  signup,
  signin,
};
