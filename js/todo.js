const categoriesListKey = "categoriesListKey";
const todosListKey = "todosListKey";


let categoriesListElement = getElement('#categoriesList');
let allTodosView = true;
let completedTodosView = false;
let notCompletedTodosView = false;


class Todo {
    constructor(title, completed = false) {
        this.title = title;
        this.completed = completed;
        this.cid = '';
    }
    complete() {
        this.completed = true;
    }
    uncomplete() {
        this.completed = false;
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
class Category {
    constructor(title) {
        this.title = title;
        this.active = true;
        this.cid = '';
        this.uid = '';
    }
    activate() {
        if (isArrayHasItems(categoriesList)) {
            categoriesList.forEach(function (category) {
                category.active = false;
            });
        }
        this.active = true;
        storeCategoriesList();
    }
    deactivate() {
        this.active = false;
    }
}

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
        activateCategory(category, id);
        getElement('#' + id).addEventListener('click', function () {
            activateCategory(category, id);
            allTodosShow();
        });
    }
    getLiElementText() {
        return `<li class="list-group-item font-weight-bold word-sapace-medium" id=${this._id}>
               <span>${this.title}</span>
               </li>`;
    }
}

function createCategoryFromUI() {
    const title = getElement('#categoryTitleInput').value;
    if (title !== '') {
        activeUser = isUserSessionActive();
        let category = new Category(title);
        category.cid = generateAlphabeticString();
        category.uid = activeUser.uid;
        const categoryElement = new CategoryElement(category);

        categoriesList.push(category);
        storeCategoriesList();
        getElement('#categoryTitleInput').value = '';
        return category;

    }
}

function createTodoFromUI() {
    if (!isArrayHasItems(getActiveUserCategoriesList())) {
        getElement('#emptyCategoriesListError').classList.remove('d-none');
        throw new Error('user has no categories');
    } else {
        getElement('#emptyCategoriesListError').classList.add('d-none');

        const title = getElement('#todoTitleInput').value;

        if (title !== '') {
            let todo = new Todo(title);
            todo.cid = getActiveCategory().cid;
            storeTodoInLocalStorage(todo);
            createTodoElement(todo);
            getElement('#todoTitleInput').value = '';
            return todo;
        }
    }

}

function createTodoElement(todo) {
    new TodoElement(todo);
}

function getActiveCategory() {
    const ActiveUserCategoriesList = getActiveUserCategoriesList();
    return ActiveUserCategoriesList.find(function (category) {
        return category.active;
    });
}

function activateCategory(category, id) {
    if (isArrayHasItems(getActiveUserCategoriesList())) {
        activeCategory = getActiveCategory();
        if (activeCategory) {
            getElement('#' + activeCategory.cid).classList.remove('category-bg');
            getElement('#' + activeCategory.cid).classList.add('text-muted');
        }
    }

    category.activate();
    getElement('#' + id).classList.add('category-bg');
    getElement('#' + id).classList.remove('text-muted');
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

function getAllTodos(category) {
    const todosList = getTodosListFromStore();
    if (isArrayHasItems(todosList)) {
        return todosList.filter(function (todo) {
            return todo.cid === category.cid;
        });

    } else {
        return [];
    }
}

function getCompletedTodos(category) {
    const todosList = getTodosListFromStore();
    if (isArrayHasItems(todosList)) {
        return todosList.filter(function (todo) {
            return todo.cid === category.cid && todo.completed;
        });

    } else {
        return [];
    }
}

function getNotCompletedTodos(category) {
    const todosList = getTodosListFromStore();
    if (isArrayHasItems(todosList)) {
        return todosList.filter(function (todo) {
            return todo.cid === category.cid && !todo.completed;
        });
    } else {
        return [];
    }
}

function storeCategoriesList() {
    localStorage.setItem(categoriesListKey, JSON.stringify(categoriesList));
}

function getCategoriesListFromStore() {
    parsedCategoriesList = JSON.parse(localStorage.getItem(categoriesListKey));

    if (isArrayHasItems(parsedCategoriesList)) {

        const categoreiesList = parsedCategoriesList.map(function (parsedCategory) {
            category = new Category(parsedCategory.title);
            category.cid = parsedCategory.cid;
            category.uid = parsedCategory.uid;
            category.active = parsedCategory.active;
            return category;
        });
        return categoreiesList;
    } else {
        return [];
    }
}

function getActiveUserCategoriesList() {

    if (isArrayHasItems(categoriesList)) {
        activeUser = isUserSessionActive();
        if (activeUser) {
            const ActiveUserCategoriesList = categoriesList.filter(function (Category) {
                return Category.uid === activeUser.uid;
            });
            return ActiveUserCategoriesList;
        } else {
            return false;
        }
    } else {
        return [];
    }
}


function storeTodoInLocalStorage(todo) {
    parsedTodosList = JSON.parse(localStorage.getItem(todosListKey));
    if (isArrayHasItems(parsedTodosList)) {
        if (isTodoExist(todo.title)) {
            storedTodoIndex = parsedTodosList.findIndex(function (storedTodo) {
                return storedTodo.title === todo.title;
            });
            parsedTodosList.splice(storedTodoIndex, 1, todo);
        } else {
            parsedTodosList.push(todo);
        }
    } else {
        parsedTodosList = [];
        parsedTodosList.push(todo);
    }
    localStorage.setItem(todosListKey, JSON.stringify(parsedTodosList));
}

function isTodoExist(title) {
    storedTodosList = getTodosListFromStore();
    if (isArrayHasItems(storedTodosList)) {
        const todo = storedTodosList.find(function (todo) {
            return todo.title === title;
        });
        if (todo) {
            return todo;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function getTodosListFromStore() {
    parsedTodosList = JSON.parse(localStorage.getItem(todosListKey));
    if (isArrayHasItems(parsedTodosList)) {
        TodosList = parsedTodosList.map(function (parsedTodo) {
            todo = new Todo(parsedTodo.title, parsedTodo.completed);
            todo.cid = parsedTodo.cid;
            return todo;
        });
        return TodosList;
    } else {
        return [];
    }

}

function getActiveCategoryTodosListFromStore() {
    const TodosList = getTodosListFromStore();
    if (isArrayHasItems(TodosList)) {
        const activeCategory = getActiveCategory();
        ActiveCategoryTodosList = TodosList.filter(function (Todo) {
            return Todo.cid === activeCategory.cid;
        });
        return ActiveCategoryTodosList;
    } else {
        return [];
    }

}

function refreshTodos() {
    if (allTodosView) {
        allTodosShow();
    } else if (completedTodosView) {
        completedTodosShow();
    } else {
        notCompletedTodosShow();
    }

}

function allTodosShow() {
    allTodosView = true;
    completedTodosView = false;
    notCompletedTodosView = false;
    if (isArrayHasItems(getActiveUserCategoriesList())) {
        getElement('#todoList').innerHTML = '';
        category = getActiveCategory();
        getAllTodos(category).forEach(function (todo) {
            new TodoElement(todo);
        });
    }
}

function completedTodosShow() {
    allTodosView = false;
    completedTodosView = true;
    notCompletedTodosView = false;
    if (isArrayHasItems(categoriesList)) {
        getElement('#todoList').innerHTML = '';
        category = getActiveCategory();
        getCompletedTodos(category).forEach(function (todo) {
            new TodoElement(todo);
        });
    }
}

function notCompletedTodosShow() {
    allTodosView = false;
    completedTodosView = false;
    notCompletedTodosView = true;
    if (isArrayHasItems(categoriesList)) {
        getElement('#todoList').innerHTML = '';
        category = getActiveCategory();
        getNotCompletedTodos(category).forEach(function (todo) {
            new TodoElement(todo);
        });
    }
}

function loadTodoPage() {
    getElement('#categoriesList').innerHTML = '';
    categoriesList.forEach(function (category) {
        category.active = false;
    });
    storeCategoriesList();
    getElement('#todoList').innerHTML = '';
    ActiveUserCategories = getActiveUserCategoriesList();
    if (isArrayHasItems(ActiveUserCategories)) {
        ActiveUserCategories.forEach(function (category) {
            new CategoryElement(category);
        });
        allTodosShow();
        // categoriesList.forEach(function (category) {
        //     category.deactivate();
        // });
    }

}

getElement('#allTodosBtn').addEventListener('click', allTodosShow);
getElement('#copmletedTodosBtn').addEventListener('click', completedTodosShow);
getElement('#notCopmletedTodosBtn').addEventListener('click', notCompletedTodosShow);


getElement('#addTodoBtn').addEventListener('click', function () {
    todo = createTodoFromUI();
    ///////////////////////////////////////////
    refreshTodos();
    ///////////////////////////////////////////
});

getElement('#addCategoryBtn').addEventListener('click', function () {
    createCategoryFromUI();
    allTodosShow();
});

getElement('#logoutBtn').addEventListener('click', function () {
    userList = getUserListFromLocalStorage();
    if (isArrayHasItems(userList)) {
        userList.forEach(function (user) {
            user.sessionTimeout = 0;
            storeUserInLocalStorage(user);
        });

    }

    storeSession(1);
    showLoginPage();
});

let categoriesList = getCategoriesListFromStore();
refresh();