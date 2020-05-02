const usersListKey = "usersKEY";

class User {
    constructor() {
        this.uid = generateAlphabeticString();
        this.fName = '';
        this.lName = '';
        this.email = '';
        this.phone = '';
        this.password = '';
        this.sessionTimeout = 0;
    }

}

function storeUserInLocalStorage(user) {
    parsedUsersList = JSON.parse(localStorage.getItem(usersListKey));
    if (parsedUsersList) {
        if (isUserExist(user.email)) {
            storedUserIndex = parsedUsersList.findIndex(function (storedUser) {
                return storedUser.email === user.email;
            });
            parsedUsersList.splice(storedUserIndex, 1, user);
        } else {
            parsedUsersList.push(user);
        }
    }
    else {
        parsedUsersList = [];
        parsedUsersList.push(user);
    }
    localStorage.setItem(usersListKey, JSON.stringify(parsedUsersList));
}

function getUserListFromLocalStorage() {
    parsedUsersList = JSON.parse(localStorage.getItem(usersListKey));
    if (parsedUsersList !== null) {
        return parsedUsersList;
    }
    else {
        return [];
    }
}

function isUserExist(email) {
    const usersList = getUserListFromLocalStorage();

    if (!isArrayHasItems(usersList)) {
        return false;
    }
    else {

        const user = usersList.find(function (user) {
            return user.email === email;
        });

        if (user === undefined) {
            return false;
        }
        else {
            return user;
        }
    }
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
