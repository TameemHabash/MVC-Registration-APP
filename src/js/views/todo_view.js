let categoriesListElement = getElement('#categoriesList');
let allTodosView = true;
let completedTodosView = false;
let notCompletedTodosView = false;

class CategoryElement {
    constructor(category) {
        this.category = category;
        this.title = category.title;
        this.todos = category.todos;
        this.active = category.active;
        this._id = category.cid;
        this.appendCategory();
    }
    appendCategory() {
        const category = this.category;
        const id = this._id;
        getElement("#categoriesList").insertAdjacentHTML('beforeend', this.getLiElementText());
        activateCategory_controller(category, id);
        getElement('#' + id).addEventListener('click', function () {
            activateCategory_controller(category, id);
            allTodosShow();
        });
    }
    getLiElementText() {
        return `<li class="list-group-item font-weight-bold word-sapace-medium" id=${this._id}>
               <span>${this.title}</span>
               </li>`;
    }
}

class TodoElement {
    constructor(todo) {
        this.todo = todo;
        this.title = this.todo.title;
        this._id = generateAlphabeticString();
        this._completeBtnID = this._id + 'Btn';
        this.appendTodo();

    }
    appendTodo() {
        let todo = this.todo;
        let completeBtnID = this._completeBtnID;
        let id = this._id;
        getElement('#todoList').insertAdjacentHTML('beforeend', this.getLiElementText());
        getElement('#' + completeBtnID).addEventListener('click', function () {
            toggleCompletion(todo, id, completeBtnID);
            storeTodoInLocalStorage(todo);
            refreshTodos();

        });
    }
    getLiElementText() {
        if (!this.todo.completed) {
            return `<li id=${this._id} class="list-group-item d-flex justify-content-between font-weight-bold text-muted">
            <span>${this.title}</span>
            <button type="button" id=${this._completeBtnID} class="btn btn-info">Complete</button>
        </li>`;
        } else {
            return `<li id=${this._id} class="list-group-item d-flex justify-content-between font-weight-bold text-muted">
            <s>${this.title}</s>
            <button type="button" id=${this._completeBtnID} class="text-info remove-button-styling bg-transparent"><i
                    class="fas fa-check-circle"></i></button>
        </li>`;
        }
    }

}

function toggleCompletion(todo, id, completeBtnID) {
    todo.completed = todo.completed ? false : true;
    getElement('#' + completeBtnID).innerHTML = todo.completed ? `<i class="fas fa-check-circle"></i>` : "Complete";
    getElement('#' + completeBtnID).classList.toggle('btn');
    getElement('#' + completeBtnID).classList.toggle('btn-info');
    getElement('#' + completeBtnID).classList.toggle('text-info');
    getElement('#' + completeBtnID).classList.toggle('remove-button-styling');
    getElement('#' + completeBtnID).classList.toggle('bg-transparent');

}

function showEmptyCategoriesListError() {
    getElement('#emptyCategoriesListError').classList.remove('d-none');
}

function hideEmptyCategoriesListError() {
    getElement('#emptyCategoriesListError').classList.add('d-none');
}

function createTodoElement(todo) {
    new TodoElement(todo);
}

function activateCategory_view(id) {
    getElement('#' + id).classList.add('category-bg');
    getElement('#' + id).classList.remove('text-muted');
}

function deactivateCategory_view(activeCategory) {
    getElement('#' + activeCategory.cid).classList.remove('category-bg');
    getElement('#' + activeCategory.cid).classList.add('text-muted');
}

function allTodosShow() {
    allTodosView = true;
    completedTodosView = false;
    notCompletedTodosView = false;
    const allTodos = getAllTodos_controller();
    if (allTodos) {
        getElement('#todoList').innerHTML = '';
        allTodos.forEach(function (todo) {
            new TodoElement(todo);
        });
    }
}

function completedTodosShow() {
    allTodosView = false;
    completedTodosView = true;
    notCompletedTodosView = false;
    const completedTodos = getCompletedTodos_controller();
    if (completedTodos) {
        getElement('#todoList').innerHTML = '';
        completedTodos.forEach(function (todo) {
            new TodoElement(todo);
        });
    }
}

function notCompletedTodosShow() {
    allTodosView = false;
    completedTodosView = false;
    notCompletedTodosView = true;
    const notCompletedTodos = getNotCompletedTodos_controller();
    if (notCompletedTodos) {
        getElement('#todoList').innerHTML = '';
        notCompletedTodos.forEach(function (todo) {
            new TodoElement(todo);
        });
    }
}

function loadTodoPage() {
    categoriesListElement.innerHTML = '';
    getElement('#todoList').innerHTML = '';
    const ActiveUserCategories = getActiveUserCategoriesList_controller();

    if (isArrayHasItems(ActiveUserCategories)) {
        ActiveUserCategories.forEach(function (category) {
            new CategoryElement(category);
        });
        allTodosShow();
    }
}

getElement('#allTodosBtn').addEventListener('click', allTodosShow);
getElement('#copmletedTodosBtn').addEventListener('click', completedTodosShow);
getElement('#notCopmletedTodosBtn').addEventListener('click', notCompletedTodosShow);

getElement('#addTodoBtn').addEventListener('click', function () {
    const title = getElement('#todoTitleInput').value;
    todo = createTodoFromUI(title);
    if (todo) {
        createTodoElement(todo);
        getElement('#todoTitleInput').value = '';
    }
    else { return }
    ///////////////////////////////////////////
    refreshTodos();
    ///////////////////////////////////////////
});

getElement('#addCategoryBtn').addEventListener('click', function () {
    const title = getElement('#categoryTitleInput').value;
    getElement('#categoryTitleInput').value = '';
    category = createCategoryFromUI(title);
    if (category) {
        const categoryElement = new CategoryElement(category);
    }
    allTodosShow();
});

getElement('#logoutBtn').addEventListener('click', function () {
    restSession_controller();

    showLoginPage();
});

// // (function waitUntlPageIsFullyLoaded() {
// //     const page = getElement('#page');
// //     const scripts = Array.from(page.querySelectorAll('script'));
// //     const view = scripts.find(script => script.scr == './js/views/todo_view.js');
// //     view.addEventListener('load', loadTodoPage);
// // })();

// window.addEventListener('load', (e) => {
//     loadTodoPage();
// });
loadTodoPage();