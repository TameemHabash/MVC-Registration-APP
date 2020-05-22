(function todoController() {

    const createCategoryFromUI = function createCategoryFromUI(title) {

        if (title !== '') {
            activeUser = activeSessionUser();
            let category = new Category(title);
            category.cid = generateAlphabeticString();
            category.uid = activeUser.uid;
            addCategoryToRunningCategoriesList(category);
            storeCategoriesList();
            return category;
        }
    }

    const createTodoFromUI = function createTodoFromUI(title) {
        if (!isArrayHasItems(getActiveUserCategoriesList())) {
            showEmptyCategoriesListError();
            throw new Error('user has no categories');
        } else {
            hideEmptyCategoriesListError();
            if (title !== '') {
                let todo = new Todo(title);
                todo.cid = getActiveCategory().cid;
                storeTodoInLocalStorage(todo);
                return todo;
            }
        }
    }

    const activateCategory_controller = function activateCategory_controller(category, id) {
        if (isArrayHasItems(getActiveUserCategoriesList())) {
            activeCategory = getActiveCategory();
            if (activeCategory) {
                deactivateCategory_view(activeCategory);
            }
        }
        category.activate();
        activateCategory_view(id);
    }

    const refreshTodos = function refreshTodos() {
        if (allTodosView) {
            allTodosShow();
        } else if (completedTodosView) {
            completedTodosShow();
        } else {
            notCompletedTodosShow();
        }
    }

    const getAllTodos_controller = function getAllTodos_controller() {
        const category = getActiveCategory();
        if (category) {
            return getAllTodos_model(category);
        }
        else {
            return [];
        }
    }

    const getCompletedTodos_controller = function getCompletedTodos_controller() {
        const category = getActiveCategory();
        if (category) {
            return getCompletedTodos_model(category);
        }
        else {
            return [];
        }
    }

    const getNotCompletedTodos_controller = function getNotCompletedTodos_controller() {
        const category = getActiveCategory();
        if (category) {
            return getNotCompletedTodos_model(category);
        }
        else {
            return [];
        }
    }


    const getActiveUserCategoriesList_controller = function getActiveUserCategoriesList_controller() {
        categoriesList.forEach(function (category) {
            category.active = false;
        });
        storeCategoriesList();
        const activeUserCategories = getActiveUserCategoriesList();
        if (isArrayHasItems(activeUserCategories)) {
            return activeUserCategories;
        } else {
            return [];
        }
    }

    const restSession_controller = function restSession_controller() {
        restSession();
    }
    return {
        createCategoryFromUI: createCategoryFromUI,
        createTodoFromUI: createTodoFromUI,
        activateCategory_controller: activateCategory_controller,
        refreshTodos: refreshTodos,
        getAllTodos_controller: getAllTodos_controller,
        getCompletedTodos_controller: getCompletedTodos_controller,
        getNotCompletedTodos_controller: getNotCompletedTodos_controller,
        getActiveUserCategoriesList_controller: getActiveUserCategoriesList_controller,
        restSession_controller: restSession_controller
    };
})();
