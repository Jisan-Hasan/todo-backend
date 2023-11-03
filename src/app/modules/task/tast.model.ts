import { Schema, model } from 'mongoose';
import { taskStatus } from './task.constant';
import { ITask, TaskModel } from './task.interface';

const TaskSchema = new Schema<ITask, TaskModel>(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: taskStatus,
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

export const Task = model<ITask, TaskModel>('Task', TaskSchema);
