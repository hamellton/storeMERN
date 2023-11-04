const serverRunningMessage = "Server is running on port"
const existingUserMessage = "User with this email already exists";
const hashErrorMessage = "Error hashing the password";
const authenticationSuccessMessage = "Authentication successful";

const userController = {
    existingUserMessage,
    hashErrorMessage,
    authenticationSuccessMessage
}

module.exports = {
  serverRunningMessage,
  userController
};
