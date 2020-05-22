function todoView() {

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
            controller.activateCategory_controller(category);
            activateCategory_view(id);
            getElement('#' + id).addEventListener('click', function () {
                controller.activateCategory_controller(category);
                activateCategory_view(id);
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
                controller.storeTodo(todo);
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

    const activateCategory_view = function activateCategory_view(id) {
        deactivateAllCategories_view();
        getElement('#' + id).classList.add('category-bg');
        getElement('#' + id).classList.remove('text-muted');
    }

    const deactivateAllCategories_view = function deactivateCategory_view() {
        const categoriesElementList = Array.from(categoriesListElement.querySelectorAll('li'));
        if (isArrayHasItems(categoriesElementList)) {
            categoriesElementList.forEach(categoryElement => {
                categoryElement.classList.remove('category-bg');
                categoryElement.classList.add('text-muted');
            });
        }
    }

    function allTodosShow() {
        allTodosView = true;
        completedTodosView = false;
        notCompletedTodosView = false;
        const allTodos = controller.getAllTodos_controller();
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
        const completedTodos = controller.getCompletedTodos_controller();
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
        const notCompletedTodos = controller.getNotCompletedTodos_controller();
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
        const ActiveUserCategories = controller.getActiveUserCategoriesList_controller();

        if (isArrayHasItems(ActiveUserCategories)) {
            ActiveUserCategories.forEach(function (category) {
                new CategoryElement(category);
            });
            allTodosShow();
        }
    }

    function refreshTodos() {
        if (allTodosView) {
            allTodosShow();
        } else if (completedTodosView) {
            completedTodosShow();
        } else {
            notCompletedTodosShow(notCompletedTodosView);
        }
    }
    getElement('#allTodosBtn').addEventListener('click', allTodosShow);
    getElement('#copmletedTodosBtn').addEventListener('click', completedTodosShow);
    getElement('#notCopmletedTodosBtn').addEventListener('click', notCompletedTodosShow);

    getElement('#addTodoBtn').addEventListener('click', function () {
        const title = getElement('#todoTitleInput').value;
        const addTodoValidity = controller.createTodoFromUI(title);
        if (addTodoValidity) {
            if (!addTodoValidity.emptyCategoriesList) {
                hideEmptyCategoriesListError();
                const todo = addTodoValidity.todo;
                if (todo) {
                    createTodoElement(todo);
                    getElement('#todoTitleInput').value = '';
                }
                else { return }
                refreshTodos();

            } else {
                showEmptyCategoriesListError();
            }
        }

    });

    getElement('#addCategoryBtn').addEventListener('click', function () {
        const title = getElement('#categoryTitleInput').value;
        getElement('#categoryTitleInput').value = '';
        const category = controller.createCategoryFromUI(title);
        if (category) {
            const categoryElement = new CategoryElement(category);
        }
        allTodosShow();
    });

    getElement('#logoutBtn').addEventListener('click', function () {
        controller.restSession_controller();

        showLoginPage();
    });

    const controller = todoController();
    loadTodoPage();
}

todoView();