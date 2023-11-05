'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TaskValidation = void 0;
const zod_1 = require('zod');
const task_constant_1 = require('./task.constant');
const create = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z
      .string({ required_error: 'Title is required' })
      .min(3)
      .max(255),
  }),
});
const update = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string().optional(),
    status: zod_1.z.enum([...task_constant_1.taskStatus]).optional(),
  }),
});
exports.TaskValidation = {
  create,
  update,
};
