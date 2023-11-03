import express from 'express';

const router = express.Router();

const applicationRoutes = [
  {
    path: '/',
    router: '/',
  },
];

applicationRoutes.forEach(route => router.use(route.path, route.route));

export default router;
