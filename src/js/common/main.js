
async function init() {
    const user = isUserSessionActive();
    if (user) {
        activateUserSession(user);
        // showTodoPage();

        clearPageTemplate();
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

        clearPageTemplate();
        await insertTemplate('login');
    }

}

init();

async function insertTemplate(name) {
    document.getElementById('page').prepend(convertTextToHtml(await fetchPageTemplate(name)));
}

async function fetchPageTemplate(name) {
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