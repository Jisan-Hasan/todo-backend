import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { taskFilterableFields } from './task.constant';
import { TaskService } from './task.service';

const create = catchAsync(async (req: Request, res: Response) => {
  // get user email from request object
  const email = req.user?.email;

  // attach user email to request body
  req.body.userEmail = email;

  const result = await TaskService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Task created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  // get user email from request object
  const email = req.user?.email;

  const filters = pick(req.query, taskFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await TaskService.getAll(email, filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tasks fetched successfully',
    data: result,
  });
});

export const TaskController = {
  create,
  getAll,
};
