import createError, { HttpError } from "http-errors";
import { Response } from "express";

export const handleError = (error: unknown, res: Response): void => {
  console.log(error);
  let httpError: HttpError;

  if (error instanceof HttpError) {
    httpError = error;
  } else {
    httpError = createError(500, "Internal server error");
  }

  for (const [key, value] of Object.entries({ ...httpError.headers })) {
    res.header(key, value);
  }

  res.status(httpError.statusCode);
  res.send(httpError.message);
};
