import { Response } from "express";

const handleSuccess = (
  message: object,
  status: number,
  res: Response,
  headers?: object
) => {
  const defaultHeaders = {
    "content-type": "application/json;charset=UTF-8",
    "Access-Control-Expose-Headers": "Authorization",
  };

  const mergedHeaders = headers
    ? { ...defaultHeaders, ...headers }
    : defaultHeaders;

  for (const [key, value] of Object.entries({ ...mergedHeaders })) {
    res.header(key, value);
  }
  res.status(status);
  res.send(message);
};

export default handleSuccess;
