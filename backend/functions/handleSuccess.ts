export const handleSuccess = (
  message: object,
  status: number,
  headers?: object
) => {
  const defaultHeaders = {
    "content-type": "application/json;charset=UTF-8",
  };

  const mergedHeaders = headers
    ? { ...defaultHeaders, ...headers }
    : defaultHeaders;

  return new Response(JSON.stringify(message), {
    status,
    headers: mergedHeaders,
  });
};
