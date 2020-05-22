
async function init() {
    const user = activeSessionUser();
    if (user) {
        activateUserSession(user);
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
    const page = getElement('#page');
    page.insertAdjacentHTML('afterbegin', await fetchPageTemplate(name));
    const scripts = Array.from(page.querySelectorAll('script'));
    for (const script of scripts) {
        script.remove();
        page.appendChild(createScript(script.src));
    }
}

function clearPageTemplate() {
    const page = getElement('#page');
    const scripts = Array.from(page.querySelectorAll('script'));
    scripts.forEach((script) => {
        script.remove();
    });
    getElement('#page').innerHTML = '';
}

init();