import { Model } from 'mongoose';

type taskStatus = 'pending' | 'in-progress' | 'done';

export type ITask = {
  title: string;
  status: taskStatus;
  userEmail: string;
};

export type TaskModel = Model<ITask, Record<string, unknown>>;
