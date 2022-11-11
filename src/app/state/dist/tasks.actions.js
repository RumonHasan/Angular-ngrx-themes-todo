"use strict";
exports.__esModule = true;
exports.controlThemeState = exports.switchFilterState = exports.filterTasks = exports.toggleArchiveState = exports.deleteComment = exports.getCommentId = exports.addCommentToTask = exports.editTaskDialogState = exports.editTask = exports.deleteCategorySearch = exports.deleteTask = exports.addNewTask = exports.getTasks = exports.ACTIONS = void 0;
var store_1 = require("@ngrx/store");
exports.ACTIONS = {
    GET: 'GET_TASKS',
    ADD: 'ADD_TASKS',
    DELETE: 'DELETE_TASKS',
    UPDATE: 'UPDATE_TASKS',
    UPDATE_EDIT_STATE: 'UPDATE_EDIT_STATE',
    ADD_COMMENT: 'ADD_COMMENT',
    COMMENT_ID: 'COMMENT_ID',
    DELETE_COMMENT: 'DELETE_COMMENT',
    TOGGLE_ARCHIVE: 'TOGGLE_ARCHIVE',
    REFRESH_CATEGORY: 'REFRESH_CATEGORY',
    FILTER_TASKS: 'FILTER_TASKS',
    SWITCH_FILTER: 'SWITCH_FILTER',
    SWITCH_THEME: 'SWITCH_THEME'
};
exports.getTasks = store_1.createAction(exports.ACTIONS.GET);
// passing props to add new task
exports.addNewTask = store_1.createAction(exports.ACTIONS.ADD, store_1.props());
// note remember adding new task is through props function
exports.deleteTask = store_1.createAction(exports.ACTIONS.DELETE, store_1.props());
// refresh category after deletion
exports.deleteCategorySearch = store_1.createAction(exports.ACTIONS.REFRESH_CATEGORY, store_1.props());
// edit content with new content and edit id
exports.editTask = store_1.createAction(exports.ACTIONS.UPDATE, store_1.props());
// edit task state
exports.editTaskDialogState = store_1.createAction(exports.ACTIONS.UPDATE_EDIT_STATE, store_1.props());
// adding a comment to a task
exports.addCommentToTask = store_1.createAction(exports.ACTIONS.ADD_COMMENT, store_1.props());
// get comment id
exports.getCommentId = store_1.createAction(exports.ACTIONS.COMMENT_ID, store_1.props());
// delete comment
exports.deleteComment = store_1.createAction(exports.ACTIONS.DELETE_COMMENT, store_1.props());
// toggle archive
exports.toggleArchiveState = store_1.createAction(exports.ACTIONS.TOGGLE_ARCHIVE, store_1.props());
// filter tasks based on search
exports.filterTasks = store_1.createAction(exports.ACTIONS.FILTER_TASKS, store_1.props());
exports.switchFilterState = store_1.createAction(exports.ACTIONS.SWITCH_FILTER);
// theme toggle function
exports.controlThemeState = store_1.createAction(exports.ACTIONS.SWITCH_THEME);
