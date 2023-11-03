import { ITask } from './task.interface';
import { Task } from './task.model';

const create = async (payload: ITask): Promise<ITask> => {
  const result = await Task.create(payload);

  return result;
};

export const TaskService = {
  create,
};
