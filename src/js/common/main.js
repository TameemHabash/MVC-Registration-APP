
async function refresh() {
    const user = isUserSessionActive();
    if (user) {
        activateUserSession(user);
        // showTodoPage();

        clearTemplate();
        await insertTemplate('todo');
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

        clearTemplate();
        await insertTemplate('login');
    }

}

refresh();

async function insertTemplate(name) {
    document.body.prepend(convertTextToHtml(await fetchTemplate(name)));
}

function clearTemplate() {
    document.body.remove();
}
