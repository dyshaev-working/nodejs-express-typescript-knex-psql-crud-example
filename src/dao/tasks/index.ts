import { head } from 'ramda';

import knex from '../../../lib/knex';
import { ErrorMessage } from '../../common/enum/errors.enum';
import { ICreateTask } from './interfaces/request/create-task.interface';
import { ISearchParams } from './interfaces/request/search-params.interface';
import { ITaskData } from './interfaces/response/task-data.interface';

const TABLE_NAME = 'tasks';

async function getAll(searchParams?: ISearchParams): Promise<ITaskData[]> {
  const defaultParams = {
    limit: 10,
    offset: 0,
    ...searchParams,
  };

  try {
    return await knex(TABLE_NAME)
      .select([
        'id',
        'title',
        'priority',
      ])
      .limit(defaultParams.limit)
      .offset(defaultParams.offset)
      .orderBy('priority', 'desc');
  } catch (e) {
    throw new Error(ErrorMessage.GET_DATA_ERROR);
  }
}

async function getById(id: number): Promise<ITaskData> {
  try {
    return await knex(TABLE_NAME)
      .select([
        'id',
        'title',
        'priority',
      ])
      .where({ id })
      .then(head);
  } catch (e) {
    throw new Error(ErrorMessage.GET_DATA_ERROR);
  }
}

async function getHeightPriority(): Promise<ITaskData | {}> {
  try {
    const subquery: { priority: number } = await knex(TABLE_NAME)
      .max('priority as priority')
      .then(head);

    if (!subquery) {
      return {};
    }

    return await knex(TABLE_NAME)
      .select([
        'id',
        'title',
        'priority',
      ])
      .where('priority', '=', subquery.priority)
      .then(head);
  } catch (e) {
    throw new Error(ErrorMessage.GET_DATA_ERROR);
  }
}

async function createTask(data: ICreateTask): Promise<ITaskData> {
  try {
    return await knex(TABLE_NAME)
      .insert({
        ...data,
        updatedAt: knex.fn.now(),
      })
      .returning([
        'id',
        'title',
        'priority',
      ])
      .then(head);
  } catch (e) {
    throw new Error(ErrorMessage.CREATE_DATA_ERROR);
  }
}

async function updateTask(id: number, data: ICreateTask): Promise<ITaskData> {
  try {
    return await knex(TABLE_NAME)
      .where({ id })
      .update({
        ...data,
        updatedAt: knex.fn.now(),
      })
      .returning([
        'id',
        'title',
        'priority',
      ])
      .then(head);
  } catch (e) {
    throw new Error(ErrorMessage.UPDATE_DATA_ERROR);
  }
}

async function deleteTask(id: number): Promise<boolean> {
  try {
    return await knex(TABLE_NAME)
      .where({ id })
      .del();
  } catch (e) {
    throw new Error(ErrorMessage.DELETE_DATA_ERROR);
  }
}

export default {
  getAll,
  getById,
  getHeightPriority,
  createTask,
  updateTask,
  deleteTask,
};
