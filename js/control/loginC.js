function loginProcess(emailInput, passwordInput) {

    validity = checkUserData(emailInput, passwordInput);
    if (!validity.existEmail) {
        showInvalideEmailError();
    } else if (!validity.rightPassword) {
        hideInvalideEmailError();
        showInvalidePasswordError();
    } else {
        activateUserSession(validity.user);
        showTodoPage();
    }
}

