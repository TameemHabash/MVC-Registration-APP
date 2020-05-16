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
    loadTodoPage();
}