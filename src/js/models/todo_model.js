(function todoModel() {

    const categoriesListKey = "categoriesListKey";
    const todosListKey = "todosListKey";

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

    const addCategoryToRunningCategoriesList = function addCategoryToRunningCategoriesList(category) {
        categoriesList.push(category);
    }

    const getActiveCategory = function getActiveCategory() {
        const ActiveUserCategoriesList = getActiveUserCategoriesList();
        return ActiveUserCategoriesList.find(function (category) {
            return category.active;
        });
    }

    const getAllTodos_model = function getAllTodos_model(category) {
        const todosList = getTodosListFromStore();
        if (isArrayHasItems(todosList)) {
            return todosList.filter(function (todo) {
                return todo.cid === category.cid;
            });

        } else {
            return [];
        }
    }

    const getCompletedTodos_model = function getCompletedTodos_model(category) {
        const todosList = getTodosListFromStore();
        if (isArrayHasItems(todosList)) {
            return todosList.filter(function (todo) {
                return todo.cid === category.cid && todo.completed;
            });

        } else {
            return [];
        }
    }

    const getNotCompletedTodos_model = function getNotCompletedTodos_model(category) {
        const todosList = getTodosListFromStore();
        if (isArrayHasItems(todosList)) {
            return todosList.filter(function (todo) {
                return todo.cid === category.cid && !todo.completed;
            });
        } else {
            return [];
        }
    }

    const storeCategoriesList = function storeCategoriesList() {
        localStorage.setItem(categoriesListKey, JSON.stringify(categoriesList));
    }

    const getCategoriesListFromStore = function getCategoriesListFromStore() {
        const parsedCategoriesList = JSON.parse(localStorage.getItem(categoriesListKey));

        if (isArrayHasItems(parsedCategoriesList)) {

            const categoreiesList = parsedCategoriesList.map(function (parsedCategory) {
                const category = new Category(parsedCategory.title);
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

    const getActiveUserCategoriesList = function getActiveUserCategoriesList() {

        if (isArrayHasItems(categoriesList)) {
            const activeUser = activeSessionUser();
            if (activeUser) {
                categoriesList.forEach(function (category) {
                    category.active = false;
                });
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


    const storeTodoInLocalStorage = function storeTodoInLocalStorage(todo) {
        const parsedTodosList = JSON.parse(localStorage.getItem(todosListKey));
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

    const isTodoExist = function isTodoExist(title) {
        const storedTodosList = getTodosListFromStore();
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

    const getTodosListFromStore = function getTodosListFromStore() {
        const parsedTodosList = JSON.parse(localStorage.getItem(todosListKey));
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

    const getActiveCategoryTodosListFromStore = function getActiveCategoryTodosListFromStore() {
        const TodosList = getTodosListFromStore();
        if (isArrayHasItems(TodosList)) {
            const activeCategory = getActiveCategory();
            const ActiveCategoryTodosList = TodosList.filter(function (Todo) {
                return Todo.cid === activeCategory.cid;
            });
            return ActiveCategoryTodosList;
        } else {
            return [];
        }

    }

    const restSession = function restSession() {
        const userList = getUserListFromLocalStorage();
        if (isArrayHasItems(userList)) {
            userList.forEach(function (user) {
                user.sessionTimeout = 0;
                storeUserInLocalStorage(user);
            });

        }

        storeSession(1);
    }

    const categoriesList = getCategoriesListFromStore();
    return {
        Category,
        Todo,
        addCategoryToRunningCategoriesList,
        getActiveCategory,
        getAllTodos_model,
        getCompletedTodos_model,
        getNotCompletedTodos_model,
        storeCategoriesList,
        getCategoriesListFromStore,
        getActiveUserCategoriesList,
        storeTodoInLocalStorage,
        isTodoExist,
        getTodosListFromStore,
        getActiveCategoryTodosListFromStore,
        restSession
    };

})();
