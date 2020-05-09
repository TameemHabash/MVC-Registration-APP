
async function init() {
    const user = isUserSessionActive();
    if (user) {
        activateUserSession(user);
        // showTodoPage();

        await showTodoPage();
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

        await showLoginPage();
    }

}

async function showSignupPage() {
    clearPageTemplate();
    await insertTemplate('signup');
}

async function showLoginPage() {
    clearPageTemplate();
    await insertTemplate('login');
}

async function showTodoPage() {
    clearPageTemplate();
    await insertTemplate('todo');
    loadTodoPage_view();
}

async function insertTemplate(name) {
    document.getElementById('page').innerHTML = await fetchPageTemplate(name);
}

async function fetchPageTemplate(name) {

    const response = await fetch(`./templates/${name}.html`);
    if (response.ok) {
        return response.text();
    } else {
        console.error(`Error fetching  ${name} templete`);
    }
}

function clearPageTemplate() {
    document.getElementById('page').innerHTML = '';
}

init();