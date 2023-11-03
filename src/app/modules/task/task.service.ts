import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { taskSearchableFields } from './task.constant';
import { ITask, ITaskFilterRequest } from './task.interface';
import { Task } from './task.model';

const create = async (payload: ITask): Promise<ITask> => {
  const result = await Task.create(payload);

  return result;
};

const getAll = async (
  email: string,
  filters: ITaskFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<ITask[]>> => {
  // calculate pagination options
  const { limit, page, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(options);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  // prepare query object
  const andConditions = [];

  // filter via user email
  andConditions.push({ userEmail: email });

  // filter via search term
  if (searchTerm) {
    andConditions.push({
      $or: taskSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // filter via other fields
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // prepare sort object
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // return whereConditions;
  const result = await Task.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // get total documents count
  const total = await Task.countDocuments(whereConditions);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getById = async (id: string, email: string): Promise<ITask> => {
  const result = await Task.findById(id);

  // check if task exists
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }

  // check if user is authorized to access this task
  if (result.userEmail !== email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to access this task',
    );
  }

  return result;
};

export const TaskService = {
  create,
  getAll,
  getById,
};
