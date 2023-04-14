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
  NO_TASKS: "No Tasks Found",
};

/* A JSON Object to store set of ERROR related Messages */
const ERRORS = {
  SYNTAX_ERROR: "Syntax Error",
  WRITE_ERROR: "Unable to Write to DB",
  INVALID_FORMAT: "Invalid Data Format",
  CORRUPTED_DB: "Database Corrupted",
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

const MY_CODES = {
  JSON_WRITE_SUCCESS: "JW_001",
  JSON_WRITE_ERROR: "JW_E_001",
  JSON_READ_SUCCESS: "JR_001",
  JSON_READ_ERROR: "JR_E_001",
  INVALID_FORMAT: "INV_F_001",
  DB_NOT_FOUND: "DB_E_001",
  CURROPTED_DB: "CR_DB_E_001",
  TASK_EXISTS: "TSK_EXIST_E_001",
  TASK_ADD_SUCCESS: "TSK_ADD_001",
};

const MY_MESSAGES = {
  JW_001: "Data Successfully Written to Database",
  JW_E_001: "Unable to Write to DB",
  JR_001: "Data Successfully Read from Database",
  JR_E_001: "Unable to Read from DB",
  INV_F_001: "Invalid Data Format",
  DB_NOT_FOUND: "Database not Found",
  CR_DB_E_001: "Database Corrupted",
  TSK_EXIST_E_001: "Task Already Exists",
  TSK_ADD_001: "Task Added Successfully",
};

module.exports = { MESSAGES, ERRORS, MY_CODES, MY_MESSAGES };
