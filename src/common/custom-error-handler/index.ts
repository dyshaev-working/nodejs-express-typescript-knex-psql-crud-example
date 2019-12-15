import { HttpStatus } from '../enum/http-status.enum';

function customErrorHandler(err: any, req: any, res: any) {
  return res
    .status(err.output.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
      error: err.output.payload,
      stack: err.stack,
    });
}

export default customErrorHandler;
