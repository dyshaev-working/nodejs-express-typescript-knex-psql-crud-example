import * as Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import CustomLogger from '../../../../common/custom-logger';
import { ErrorMessage } from '../../../../common/enum/errors.enum';
import tasksDAO from '../../../../dao/tasks';
import { HttpStatus } from './../../../../common/enum/http-status.enum';

async function getAllTasksService(req: Request, res: Response, next: NextFunction) {
  const {
    query: {
      offset,
      limit,
    },
  } = req;

  try {
    return res
      .status(HttpStatus.OK)
      .send(await tasksDAO.getAll({
        offset,
        limit,
      }));
  } catch (e) {
    CustomLogger.error(e);

    return next(Boom.badRequest(e));
  }
}

async function getTaskByIdService(req: Request, res: Response, next: NextFunction) {
  const {
    params: {
      id,
    },
  } = req;

  try {
    const task = await tasksDAO.getById(Number(id));

    if (!task) {
      throw new Error(ErrorMessage.NOT_FOUND_ERROR);
    }

    return res
      .status(HttpStatus.OK)
      .send(task);
  } catch (e) {
    CustomLogger.error(e);

    return next(Boom.badRequest(e));
  }
}

async function getHeightPriorityTaskService(req: Request, res: Response, next: NextFunction) {
  try {
    const heightPriorityTask = await tasksDAO.getHeightPriority();

    if (!heightPriorityTask) {
      throw new Error(ErrorMessage.NOT_FOUND_ERROR);
    }

    return res
      .status(HttpStatus.OK)
      .send(heightPriorityTask);
  } catch (e) {
    CustomLogger.error(e);

    return next(Boom.badRequest(e));
  }
}

export default {
  getAllTasksService,
  getTaskByIdService,
  getHeightPriorityTaskService,
};
