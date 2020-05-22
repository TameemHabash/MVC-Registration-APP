function todoController() {

    const createCategoryFromUI = function createCategoryFromUI(title) {

        if (title !== '') {
            activeUser = activeSessionUser();
            let category = new Model.Category(title);
            category.cid = generateAlphabeticString();
            category.uid = activeUser.uid;
            Model.addCategoryToRunningCategoriesList(category);
            Model.storeCategoriesList();
            return category;
        }
    }

    const createTodoFromUI = function createTodoFromUI(title) {
        if (!isArrayHasItems(Model.getActiveUserCategoriesList())) {
            return {
                emptyCategoriesList: true,
                todo: undefined
            };
        } else {
            if (title !== '') {
                const todo = new Model.Todo(title);
                todo.cid = Model.getActiveCategory().cid;
                Model.storeTodoInLocalStorage(todo);
                return {
                    emptyCategoriesList: false,
                    todo: todo
                };
            }
        }
    }

    const activateCategory_controller = function activateCategory_controller(category) {
        category.activate();
    }

    const getAllTodos_controller = function getAllTodos_controller() {
        const category = Model.getActiveCategory();
        if (category) {
            return Model.getAllTodos_model(category);
        }
        else {
            return [];
        }
    }

    const getCompletedTodos_controller = function getCompletedTodos_controller() {
        const category = Model.getActiveCategory();
        if (category) {
            return Model.getCompletedTodos_model(category);
        }
        else {
            return [];
        }
    }

    const getNotCompletedTodos_controller = function getNotCompletedTodos_controller() {
        const category = Model.getActiveCategory();
        if (category) {
            return Model.getNotCompletedTodos_model(category);
        }
        else {
            return [];
        }
    }


    const getActiveUserCategoriesList_controller = function getActiveUserCategoriesList_controller() {
        Model.storeCategoriesList();
        const activeUserCategories = Model.getActiveUserCategoriesList();
        if (isArrayHasItems(activeUserCategories)) {
            return activeUserCategories;
        } else {
            return [];
        }
    }

    const restSession_controller = function restSession_controller() {
        Model.restSession();
    }

    const storeTodo = function storeTodo(todo) {
        Model.storeTodoInLocalStorage(todo);
    }

    // const storeTodoViews_controller = function storeTodoViews_controller(all, completed, notCompleted) {
    //     Model.storeTodoViews_model(all, completed, notCompleted);
    // }

    // const getTodoViews_controller = function getTodoViews_controller() {
    //     return Model.getTodoViewsFromLocalStorage();
    // }

    const Model = todoModel();
    // let View;
    // (function waitUntlPageIsFullyLoaded() {
    //     const page = getElement('#page');
    //     const scripts = Array.from(page.querySelectorAll('script'));
    //     const view = scripts.find(script => script.src === 'http://127.0.0.1:5500/src/js/views/todo_view.js');
    //     view.addEventListener('load', function () {
    //         View = todoView();
    //     });
    // })();
    return {
        createCategoryFromUI,
        createTodoFromUI,
        activateCategory_controller,
        getAllTodos_controller,
        getCompletedTodos_controller,
        getNotCompletedTodos_controller,
        getActiveUserCategoriesList_controller,
        restSession_controller,
        storeTodo
    };
}
todoController();