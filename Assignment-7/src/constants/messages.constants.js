/* A JSON Object to store a set of messages to display to users. */
const MESSAGES = {
  HOME_ROUTE: "This is the home route",
  ACCOUNT_CREATION_SUCCESS: "Your account has been created successfully!",
  LOGIN_SUCCESS: "Log in successful",
  ADD_SUCCESS: "Successfully Added Task to Task List",
  RETRIEVED_ALL: "Successfully Retrieved All Tasks",
  UPDATE_SUCCESS: "Successfully Updated Task",
  DELETE_SUCCESS: "Successfully Deleted Task",
  AUTHENTICATION_SUCCESS: "Authentication Success",
  WRITE_SUCCESS: "Data Successfully Written to Database",
  READ_SUCCESS: "Data Successfully Read from Database",
  USER_ALREADY_EXISTS: "User Already Exists",
  USER_NOT_FOUND: "User Not Found",
  INVALID_PASSWORD: "Invalid Password",
  TASK_ID_EXISTS: "Task ID Already Exists",
  TASK_ADD_SUCCESS: "Task Added Successfully",
  TASK_NOT_FOUND: "Task Not Found",
  UPDATE_FAIL: "Can't Update Some Data",
};

/* A JSON Object to store set of ERROR related Messages */
const ERRORS = {
  SYNTAX_ERROR: "Syntax Error",
  WRITE_ERROR: "Unable to Write to DB",
  INVALID_FORMAT: "Invalid Data Format",
  CURROPTED_DB: "Database Curropted",
  DATA_NOT_FOUND: "Data Not Found",
  DATABASE_NOT_FOUND: "Database Not Found",
  INVALID_URL: "Invalid URL, Cannot Process Request",
  INVALID_PAYLOAD: "Invalid Payload",
  ACCESS_TOKEN_NOT_FOUND: "Access Token Not Found in Header",
  USERNAME_NOT_FOUND: "Username Not Found in Header",
  UNAUTHORIZED_TOKEN: "Unauthorized Access Token",
  UNAUTHENTICATED_USER: "Unauthenticated User",
  ACCESS_TOKEN_EXPIRED: "Access Token Expired. Login Required",
  INVALID_ACCESS_TOKEN: "Invalid Access Token",
  LOGIN_FAILED: "Login Failed. Incorrect Username / Password",
};
module.exports = { MESSAGES, ERRORS };
