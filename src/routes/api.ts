import * as express from 'express';

import tasksRouter from './api/v1/task';

const router = express.Router();

router.use('/v1/tasks', tasksRouter);

export default router;
