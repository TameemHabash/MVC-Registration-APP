function loginProcess(validity) {
    activateUserSession(validity.user);
    showTodoPage();
}
function loginValidity(emailInput, passwordInput) {
    return checkUserData(emailInput, passwordInput);
}
