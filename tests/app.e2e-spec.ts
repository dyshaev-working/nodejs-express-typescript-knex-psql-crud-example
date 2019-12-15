import * as request from 'supertest';

import * as app from '../src/app';
import { HttpStatus } from './../src/common/enum/http-status.enum';

describe('Post endpoint', () => {
  it('should create a new task', async (done: any) => {
    const data = {
      title: 'Example task name',
      priority: 100,
    };

    const res = await request(app)
      .post('/api/v1/tasks')
      .send(data);

    expect(res.status).toEqual(HttpStatus.CREATED);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', data.title);
    expect(res.body).toHaveProperty('priority', data.priority);
    done();
  });
});

describe('Get endpoint', () => {
  const exampleSnapshot = {
    id: expect.any(Number),
    title: expect.any(String),
    priority: expect.any(Number),
  };

  it('should get all task', async (done: any) => {
    const res = await request(app)
      .get('/api/v1/tasks/all');

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body[0]).toMatchSnapshot({
      id: expect.any(Number),
      title: expect.any(String),
      priority: expect.any(Number),
    });
    done();
  });

  it('should get highest priority task', async (done: any) => {
    const res = await request(app)
      .get('/api/v1/tasks/priority/height');

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toMatchSnapshot(exampleSnapshot);
    done();
  });

  it('should get task by id', async (done: any) => {
    const { body: { id } } = await request(app)
      .get('/api/v1/tasks/priority/height');

    const res = await request(app)
      .get(`/api/v1/tasks/${id}`);

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toMatchSnapshot(exampleSnapshot);
    done();
  });
});

describe('Put endpoint', () => {
  it('should update a task', async (done: any) => {
    const data = {
      title: 'Example task name updated title',
      priority: 50,
    };

    const { body: { id } } = await request(app)
      .get('/api/v1/tasks/priority/height');

    const res = await request(app)
      .put(`/api/v1/tasks/${id}`)
      .send(data);

    expect(res.status).toEqual(HttpStatus.OK);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', data.title);
    expect(res.body).toHaveProperty('priority', data.priority);
    done();
  });
});

describe('Delete endpoint', () => {
  it('should delete a task', async (done: any) => {
    const { body: { id } } = await request(app)
      .get('/api/v1/tasks/priority/height');

    const res = await request(app)
      .delete(`/api/v1/tasks/${id}`);

    expect(res.status).toEqual(HttpStatus.OK);
    done();
  });
});
