const serverRunningMessage = "Server is running on port"
const existingUserMessage = "User with this email already exists";
const registrationSuccessMessage = "User registered successfully";
const invalidCredentialsMessage = "Invalid credentials";
const mailChAccessDeniedMessage = "Access denied for @mail.ch addresses";
const hashErrorMessage = "Error hashing the password";
const authenticationSuccessMessage = "Authentication successful";
const logoutSuccessMessage = "Logout successful";
const deleteUserNotFoundMessage = "User not found";
const deleteSuccessMessage = "User deleted successfully";
const deleteUserErrorMessage = "Error deleting the user";
const unauthorizedMessage = "Unauthorized";
const authenticationErrorMessage = "Authentication error";

const userController = {
  existingUserMessage,
  registrationSuccessMessage,
  invalidCredentialsMessage,
  mailChAccessDeniedMessage,
  hashErrorMessage,
  authenticationSuccessMessage,
  logoutSuccessMessage,
  deleteUserNotFoundMessage,
  deleteSuccessMessage,
  deleteUserErrorMessage,
}

module.exports = {
  serverRunningMessage,
  unauthorizedMessage,
  authenticationErrorMessage,
  userController
};
