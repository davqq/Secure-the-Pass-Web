import createError, { HttpError } from "http-errors";

export const handleError = (error: unknown) => {
  let httpError: HttpError;

  if (error instanceof HttpError) {
    httpError = error;
  } else {
    httpError = createError(500, "Internal server error");
  }

  return new Response(JSON.stringify({ error: httpError.message }), {
    status: httpError.statusCode,
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
};
