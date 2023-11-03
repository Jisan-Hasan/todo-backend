import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const TaskController = {
  create,
};
