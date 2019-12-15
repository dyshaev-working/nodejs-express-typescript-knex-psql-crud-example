import * as express from 'express';

import deleteTask from './task.delete';
import getTask from './task.get';
import createTask from './task.post';
import updateTask from './task.put';
import createTaskSchema from './validation/create-task.schema';
import idParamsSchema from './validation/id-params.schema';
import searchParamsSchema from './validation/search-params.schema';
import updateTaskSchema from './validation/update-task.schema';

const { Validator } = require('express-json-validator-middleware');

const validator = new Validator({ allErrors: true });
const validate = validator.validate;

const router = express.Router();

router.get(
  '/all',
  validate({
    query: searchParamsSchema,
  }),
  getTask.getAllTasksService,
);

router.get(
  '/priority/height',
  getTask.getHeightPriorityTaskService,
);

router.get(
  '/:id',
  validate({
    params: idParamsSchema,
  }),
  getTask.getTaskByIdService,
);

router.post(
  '/',
  validate({
    body: createTaskSchema,
  }),
  createTask.createTaskService,
);

router.put(
  '/:id',
  validate({
    params: idParamsSchema,
    body: updateTaskSchema,
  }),
  updateTask.updateTaskService,
);

router.delete(
  '/:id',
  validate({
    params: idParamsSchema,
  }),
  deleteTask.deleteTaskService,
);

export default router;
