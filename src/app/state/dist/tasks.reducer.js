"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.taskReducer = void 0;
var store_1 = require("@ngrx/store");
var tasks_state_1 = require("./tasks.state");
var tasks_actions_1 = require("./tasks.actions");
// main task reducer
var task_reducer = store_1.createReducer(tasks_state_1.initialStates, 
// fetching the initial tasks
store_1.on(tasks_actions_1.getTasks, function (state) {
    return __assign({}, state);
}), 
// adding a new task
store_1.on(tasks_actions_1.addNewTask, function (state, action) {
    return __assign(__assign({}, state), { tasks: __spreadArrays(state.tasks, [action.newTask]), categories: __spreadArrays(state.categories, [action.newTask.category]) });
}), 
// deleting a task including the category
store_1.on(tasks_actions_1.deleteTask, function (state, action) {
    var possibleDeleteCategory = action.deleteCategory; // temporary
    var tasksAfterDeleting = state.tasks.filter(function (singleTask) {
        return singleTask.id !== action.deleteId;
    });
    return __assign(__assign({}, state), { tasks: tasksAfterDeleting });
}), 
// refresh category after deleting task... note runs after deletion function
store_1.on(tasks_actions_1.deleteCategorySearch, function (state, action) {
    var category = action.deleteCategory;
    // check for remaining deletion categories
    var checkRemaining = state.tasks.some(function (task) {
        return task.category.toLowerCase() === category.toLowerCase();
    });
    var newCategories = [];
    if (!checkRemaining) {
        newCategories = state.categories.filter(function (categoryTask) {
            return categoryTask.toLowerCase() !== category.toLowerCase();
        });
        return __assign(__assign({}, state), { categories: newCategories });
    }
    else {
        return __assign({}, state);
    }
}), 
//switch edit task dialog box state
store_1.on(tasks_actions_1.editTaskDialogState, function (state, action) {
    return __assign(__assign({}, state), { editId: action.editStateId });
}), 
// editing the task
store_1.on(tasks_actions_1.editTask, function (state, action) {
    var newContent = action.newContent;
    var editId = action.updateId;
    // edit logic
    var editedArray = state.tasks.map(function (singleTask) {
        // if the id is same then the object is edited
        if (singleTask.id === editId) {
            return __assign(__assign({}, singleTask), { title: newContent.title, description: newContent.description, category: newContent.category });
        }
        else {
            return singleTask;
        }
    });
    return __assign(__assign({}, state), { tasks: editedArray });
}), 
// updating the comment id
store_1.on(tasks_actions_1.getCommentId, function (state, action) {
    return __assign(__assign({}, state), { commentId: action.commentId });
}), 
// adding a comment to an existing task with id as a detection
store_1.on(tasks_actions_1.addCommentToTask, function (state, action) {
    var taskId = action.commentTaskId;
    var comment = action.comment;
    var commentObject = {
        id: Date.now(),
        commentDetails: comment
    };
    var commentedArray = state.tasks.map(function (singleTask) {
        if (singleTask.id === taskId) {
            return __assign(__assign({}, singleTask), { comments: __spreadArrays(singleTask.comments, [commentObject]) });
        }
        else {
            return singleTask;
        }
    });
    return __assign(__assign({}, state), { tasks: commentedArray });
}), 
// deleting comment from task
store_1.on(tasks_actions_1.deleteComment, function (state, action) {
    var deleteCommentId = action.deleteCommentId;
    var taskId = action.taskId;
    var afterDeletedCommentArray = state.tasks.map(function (task) {
        if (task.id === taskId) {
            return __assign(__assign({}, task), { comments: task.comments.filter(function (comment) {
                    return comment.id !== deleteCommentId;
                }) });
        }
        else {
            return task;
        }
    });
    return __assign(__assign({}, state), { tasks: afterDeletedCommentArray });
}), 
// toggle archive state
store_1.on(tasks_actions_1.toggleArchiveState, function (state, action) {
    var prevState = action.archiveState;
    return __assign(__assign({}, state), { archiveState: !prevState });
}), 
// filter tasks based on search term
store_1.on(tasks_actions_1.filterTasks, function (state, action) {
    var searchTerm = action.searchTerm;
    var existingTasks = __spreadArrays(state.tasks);
    var filteredTasks = existingTasks.filter(function (task) {
        return task.category.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            task.title.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    return __assign(__assign({}, state), { filteredTasks: filteredTasks, filterState: true });
}), 
// switch filter state to false
store_1.on(tasks_actions_1.switchFilterState, function (state, action) {
    return __assign(__assign({}, state), { filterState: false });
}), 
// control theme state between dark and light themes
store_1.on(tasks_actions_1.controlThemeState, function (state, action) {
    var initalThemeState = state.themeState;
    return __assign(__assign({}, state), { themeState: !initalThemeState });
}));
// returning the primary reducer as a callable value
function taskReducer(state, action) {
    return task_reducer(state, action);
}
exports.taskReducer = taskReducer;
