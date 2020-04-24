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

function createUserFromUI() {
    user = new User();
    user.fName = getElement('#signupFname').value;
    user.lName = getElement('#signupLname').value;
    user.email = getElement('#signupEmail').value.toLowerCase();
    user.phone = getElement('#signupPhone').value;
    user.password = encode(getElement('#signupPassword2').value);

    storeUserInLocalStorage(user);

    getElement('#signupFname').value = '';
    getElement('#signupLname').value = '';
    getElement('#signupPhone').value = '';
    getElement('#signupEmail').value = '';
    getElement('#signupPassword1').value = '';
    getElement('#signupPassword2').value = '';


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
