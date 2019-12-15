import * as Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import CustomLogger from '../../../../common/custom-logger';
import { HttpStatus } from '../../../../common/enum/http-status.enum';
import tasksDAO from '../../../../dao/tasks';

async function createTaskService(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    return res
      .status(HttpStatus.OK)
      .send(await tasksDAO.createTask(body));
  } catch (e) {
    CustomLogger.error(e);

    return next(Boom.badRequest(e));
  }
}

export default {
  createTaskService,
};
