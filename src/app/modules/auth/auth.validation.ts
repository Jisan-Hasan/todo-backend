import { z } from 'zod';

const signup = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 character.')
      .max(12, 'Password must be at most 12 character.'),
    name: z
      .string({ required_error: 'Name is Required' })
      .min(3, 'Name must be at least 3 character')
      .max(20, 'Name must be at most 20 character'),
  }),
});

const signin = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidation = {
  signup,
  signin,
};
