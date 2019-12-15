import * as Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import CustomLogger from '../../../../common/custom-logger';
import { ErrorMessage } from '../../../../common/enum/errors.enum';
import tasksDAO from '../../../../dao/tasks';
import { HttpStatus } from './../../../../common/enum/http-status.enum';

async function deleteTaskService(req: Request, res: Response, next: NextFunction) {
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

    await tasksDAO.deleteTask(Number(id));

    return res
      .status(HttpStatus.OK)
      .send(true);
  } catch (e) {
    CustomLogger.error(e);

    return next(Boom.badRequest(e));
  }
}

export default {
  deleteTaskService,
};
