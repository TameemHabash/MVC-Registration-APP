
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
    document.getElementById('page').prepend(convertTextToHtml(await fetchTemplate(name)));
}

async function fetchTemplate(name) {
    const response = await fetch(`./src/templates/${name}.html`);
    if (response.ok) {
        return response.text();
    } else {
        console.error(`Error fetching the templete ${name}`);
    }
}
function clearPageTemplate() {
    document.getElementById('page').innerHTML = '';
} 