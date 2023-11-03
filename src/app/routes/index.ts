import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { TaskRoutes } from '../modules/task/task.route';

const router = express.Router();

const applicationRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/task',
    route: TaskRoutes,
  },
];

applicationRoutes.forEach(route => router.use(route.path, route.route));

export default router;
