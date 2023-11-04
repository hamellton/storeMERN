const serverRunningMessage = "Server is running on port"
const existingUserMessage = "User with this email already exists";
const hashErrorMessage = "Error hashing the password";
const authenticationSuccessMessage = "Authentication successful";
const invalidCredentialsMessage = "Invalid credentials";
const mailChAccessDeniedMessage = "Access denied for @mail.ch addresses";

const userController = {
    existingUserMessage,
    hashErrorMessage,
    authenticationSuccessMessage,
    invalidCredentialsMessage,
    mailChAccessDeniedMessage,
}

module.exports = {
  serverRunningMessage,
  userController
};
