

function createCategoryFromUI(title) {

    if (title !== '') {
        activeUser = isUserSessionActive();
        let category = new Category(title);
        category.cid = generateAlphabeticString();
        category.uid = activeUser.uid;
        addCategoryToRunningCategoriesList(category);
        storeCategoriesList();
        return category;
    }
}

function createTodoFromUI(title) {
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

function activateCategory_controller(category, id) {
    if (isArrayHasItems(getActiveUserCategoriesList())) {
        activeCategory = getActiveCategory();
        if (activeCategory) {
            deactivateCategory_view(activeCategory);
        }
    }
    category.activate();
    activateCategory_view(id);
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

function getAllTodos_controller() {
    const category = getActiveCategory();
    if (category) {
        return getAllTodos_model(category);
    }
    else {
        return [];
    }
}

function getCompletedTodos_controller() {
    const category = getActiveCategory();
    if (category) {
        return getCompletedTodos_model(category);
    }
    else {
        return [];
    }
}

function getNotCompletedTodos_controller() {
    const category = getActiveCategory();
    if (category) {
        return getNotCompletedTodos_model(category);
    }
    else {
        return [];
    }
}


function loadTodoPage_controller() {
    categoriesList.forEach(function (category) {
        category.active = false;
    });
    storeCategoriesList();
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