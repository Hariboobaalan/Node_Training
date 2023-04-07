/**
 * The function sets a response object with a status code, message, and data.
 * @param [code=200] - The HTTP status code to be returned in the response. The default value is 200,
 * which means "OK".
 * @param [message=OK] - The message parameter is a string that represents the status message of the
 * response. It is typically used to provide additional information about the response status code. In
 * this case, the default value is "OK", which is a common status message for successful responses.
 * @param [data] - The `data` parameter in the `setResponse` function is an optional parameter that can
 * be used to pass any additional data that needs to be included in the response object. This can be
 * useful when returning data from an API or when sending a response to a client-side application. If
 * no data is
 * @returns The function `setResponse` is returning an object with three properties: `code`, `message`,
 * and `data`. The values of these properties are determined by the arguments passed to the function.
 */
const setResponse = (code = 200, message = "OK", data = null) => {
  let responseObject = {
    code: code,
    message: message,
    data: data,
  };
  return responseObject;
};

module.exports = { setResponse };
