'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Task = void 0;
const mongoose_1 = require('mongoose');
const task_constant_1 = require('./task.constant');
const TaskSchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: task_constant_1.taskStatus,
      default: 'pending',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
exports.Task = (0, mongoose_1.model)('Task', TaskSchema);
