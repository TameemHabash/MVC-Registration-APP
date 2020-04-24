const sessionKey = 'sessionKey';



function showLoginPage() {
    getElement('#loginEmail').value = '';
    getElement('#loginPassword').value = '';

    getElement('#emptyLoginInfoError').classList.add('d-none');
    getElement('#invalideEmailError').classList.add('d-none');
    getElement('#invalidePasswordError').classList.add('d-none');


    getElement('#loginPage').classList.remove('d-none');
    getElement('#signupPage').classList.add('d-none');
    getElement('#todoPage').classList.add('d-none');

}

function showSignupPage() {
    getElement('#signupFname').value = '';
    getElement('#signupLname').value = '';
    getElement('#signupPhone').value = '';
    getElement('#signupEmail').value = '';
    getElement('#signupPassword1').value = '';
    getElement('#signupPassword2').value = '';

    getElement('#FnameError').classList.add('d-none');
    getElement('#LnameError').classList.add('d-none');
    getElement('#Password1Error').classList.add('d-none');
    getElement('#Password2NotMatchError').classList.add('d-none');
    getElement('#fullInfoError').classList.add('d-none');
    getElement('#existAccountError').classList.add('d-none');



    getElement('#signupPage').classList.remove('d-none');
    getElement('#loginPage').classList.add('d-none');
    getElement('#todoPage').classList.add('d-none');
}



function showTodoPage() {
    getElement('#todoPage').classList.remove('d-none');
    getElement('#signupPage').classList.add('d-none');
    getElement('#loginPage').classList.add('d-none');
    loadTodoPage();
}



function activateUserSession(user) {
    user.sessionTimeout = getMillisecondsOfOneHourAddedOnNowDate();
    storeSession(user.sessionTimeout);
    storeUserInLocalStorage(user);
}

function deactivateUserSession(user) {
    user.sessionTimeout = 0;
    localStorage.setItem(sessionKey, JSON.stringify(user.sessionTimeout));
}

function getSession() {
    const stringifedSession = localStorage.getItem(sessionKey);
    if (stringifedSession) {
        return parseInt(stringifedSession, 10);
    }
}

function storeSession(Milliseconds) {
    localStorage.setItem(sessionKey, JSON.stringify(Milliseconds));
}


function isUserSessionActive() {
    const storedSession = getSession();
    if (storedSession) {
        if (storedSession > getMillisecondsOfNowDate()) {
            return getUserListFromLocalStorage().find(function (user) {
                return user.sessionTimeout === storedSession;
            });
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}


function refresh() {
    const user = isUserSessionActive();
    if (user) {
        activateUserSession(user);
        showTodoPage();
    }
    else {
        userList = getUserListFromLocalStorage();
        if (isArrayHasItems(userList)) {

            userList.forEach(function (user) {
                user.sessionTimeout = 0;
                storeUserInLocalStorage(user)
            });

            storeSession(1);
        }

        showLoginPage();
    }

}


