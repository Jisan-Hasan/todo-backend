import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TaskController } from './task.controller';
import { TaskValidation } from './task.validation';

const router = express.Router();

router.post(
  '/',
  auth,
  validateRequest(TaskValidation.create),
  TaskController.create,
);

router.get('/', auth, TaskController.getAll);

router.get('/:id', auth, TaskController.getById);

router.patch(
  '/:id',
  auth,
  validateRequest(TaskValidation.update),
  TaskController.update,
);

export const TaskRoutes = router;
