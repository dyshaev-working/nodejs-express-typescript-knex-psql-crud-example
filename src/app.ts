import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as httpErrors from 'http-errors';
import * as path from 'path';

import customErrorHandler from './common/custom-error-handler';
import { HttpStatus } from './common/enum/http-status.enum';
import apiRouter from './routes/api';
import healthRouter from './routes/health';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/health', healthRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
  next(httpErrors(HttpStatus.NOT_FOUND));
});

app.use((err: any, req: any, res: any) => {
  res.type('application/json');

  if (err.isBoom) {
    res
      .status(err.output.payload.statusCode)
      .send(err.output.payload);
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.stack = req.app.get('env') === 'development' ? err.stack : {};

  return res
    .status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
    .send(res.locals);
});

app.use(customErrorHandler);

export default app;
