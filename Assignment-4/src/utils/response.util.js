/**
 * The function sets a response object with a given code, message, and data, and returns it.
 * @param [code=200] - The HTTP status code to be returned in the response. The default value is 200,
 * which means "OK".
 * @param [message=OK] - The `message` parameter is a string that represents the status message of the
 * HTTP response. It is typically used to provide additional information about the status code. For
 * example, if the status code is 200, the message might be "OK", indicating that the request was
 * successful.
 * @param [data] - The `data` parameter in the `setResponse` function is an optional parameter that can
 * be used to pass any additional data that needs to be included in the response object. It can be a
 * string, number, object, or any other data type. If no value is provided for `data`,
 * @returns The function `setResponse` is returning an object with three properties: `code`, `message`,
 * and `data`. The values of these properties are determined by the arguments passed to the function.
 * If no arguments are passed, the default values are `200` for `code`, `"OK"` for `message`, and an
 * empty string for `data`.
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
