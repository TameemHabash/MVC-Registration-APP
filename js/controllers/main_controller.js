
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
window.setTimeout(function () {
    refresh();
}, 2 * 1000);