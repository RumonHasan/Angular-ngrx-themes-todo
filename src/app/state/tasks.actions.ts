import { createAction, props } from "@ngrx/store";
import { Task } from "../task/task";
export const ACTIONS = {
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
    SWITCH_THEME: 'SWITCH_THEME',
    PASS_TASKS_CATEGORIES: 'PASS_TASKS_CATEGORIES'
}
export const getTasks = createAction(ACTIONS.GET);
// passing props to add new task
export const addNewTask = createAction(ACTIONS.ADD, props<{newTask: Task}>());
// note remember adding new task is through props function
export const deleteTask = createAction(ACTIONS.DELETE, props<{deleteId: Number, deleteCategory: string}>());
// refresh category after deletion
export const deleteCategorySearch = createAction(ACTIONS.REFRESH_CATEGORY, props<{deleteCategoryId: any, deleteCategory: any}>());
// edit content with new content and edit id
export const editTask = createAction(ACTIONS.UPDATE, props<{updateId: any, newContent: any}>());
// edit task state
export const editTaskDialogState = createAction(ACTIONS.UPDATE_EDIT_STATE, props<{editStateId: any}>());
// adding a comment to a task
export const addCommentToTask = createAction(ACTIONS.ADD_COMMENT, props<{commentTaskId: any,comment: any}>());
// get comment id
export const getCommentId = createAction(ACTIONS.COMMENT_ID, props<{commentId: any}>());
// delete comment
export const deleteComment = createAction(ACTIONS.DELETE_COMMENT, props<{deleteCommentId: any, taskId: any}>());
// toggle archive
export const toggleArchiveState = createAction(ACTIONS.TOGGLE_ARCHIVE, props<{archiveState: boolean}>());
// filter tasks based on search
export const filterTasks = createAction(ACTIONS.FILTER_TASKS, props<{searchTerm: any, filterState: boolean}>());
export const switchFilterState = createAction(ACTIONS.SWITCH_FILTER);
// theme toggle function
export const controlThemeState = createAction(ACTIONS.SWITCH_THEME);
// category focus
export const passTasksByCategories = createAction(ACTIONS.PASS_TASKS_CATEGORIES, props<{categories: any, tasks: any}>());