import { z } from 'zod';
import { taskStatus } from './task.constant';

const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(3).max(255),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    status: z.enum([...taskStatus] as [string, ...string[]]).optional(),
  }),
});

export const TaskValidation = {
  create,
  update,
};
