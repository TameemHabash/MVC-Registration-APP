
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

async function insertTemplate(name) {
    const page = document.getElementById('page');
    page.insertAdjacentHTML('afterbegin', await fetchPageTemplate(name));
    const scripts = Array.from(page.querySelectorAll('script'));
    scripts.forEach((script) => {
        script.remove();
        page.insertAdjacentElement('afterbegin', createScript(script.src));
    });
}

function clearPageTemplate() {
    document.getElementById('page').innerHTML = '';
}


init();