import { createReducer, on } from "@ngrx/store";
import { initialStates } from "./tasks.state";
import { getTasks, addNewTask, deleteTask, editTaskDialogState, editTask, getCommentId, addCommentToTask, deleteComment, toggleArchiveState, deleteCategorySearch, filterTasks, switchFilterState, controlThemeState, passTasksByCategories } from "./tasks.actions";
import { Task } from "../task/task";
import { state } from "@angular/animations";

// main task reducer
const task_reducer = createReducer(initialStates, 
    // fetching the initial tasks
    on(getTasks, (state: any)=>{
        return {
            ...state,
        }
    }),
    // adding a new task
    on(addNewTask, (state: any, action)=>{
        return {
            ...state,
            tasks: [...state.tasks, action.newTask],
            categories: [...state.categories, action.newTask.category]
        }
    }),
    // deleting a task including the category
    on(deleteTask, (state: any, action)=>{
        const possibleDeleteCategory = action.deleteCategory; // temporary
        const tasksAfterDeleting = state.tasks.filter((singleTask: any)=> 
        singleTask.id !== action.deleteId);
        return {
            ...state,
            tasks: tasksAfterDeleting
        }
    }),

    // refresh category after deleting task... note runs after deletion function
    on(deleteCategorySearch, (state: any, action)=>{
        const category = action.deleteCategory;
        // check for remaining deletion categories
        const checkRemaining = state.tasks.some((task: any)=> 
            task.category.toLowerCase() === category.toLowerCase()
        );
        let newCategories = [];
        if(!checkRemaining){
            newCategories = state.categories.filter((categoryTask: any)=> 
                categoryTask.toLowerCase() !== category.toLowerCase()
            )
            return {
                ...state,
                categories: newCategories
            }
        }else{
            return {
                ...state,
            }
        }
    }),
    
    //switch edit task dialog box state
    on(editTaskDialogState, (state: any, action)=>{
        return {
            ...state,
            editId: action.editStateId
        }
    }),
    // editing the task
    on(editTask, (state: any, action)=>{
        const newContent = action.newContent;
        const editId = action.updateId;
        // edit logic
        const editedArray = state.tasks.map((singleTask: any)=>{
            // if the id is same then the object is edited
            if(singleTask.id === editId){
                return {
                    ...singleTask,
                    title:newContent.title,
                    description: newContent.description,
                    category: newContent.category
                }   
            }else{
                return singleTask;
            }
        });
        return {
            ...state,
            tasks: editedArray
        }
    }),
    // updating the comment id
    on(getCommentId, (state: any, action)=>{
        return {
            ...state,
            commentId: action.commentId
        }
    }),
    // adding a comment to an existing task with id as a detection
    on(addCommentToTask, (state: any, action)=>{
        const taskId = action.commentTaskId;
        const comment = action.comment;
        const commentObject = {
            id: Date.now(),
            commentDetails: comment
        };
        const commentedArray = state.tasks.map((singleTask: any)=>{
            if(singleTask.id === taskId){
                return {
                    ...singleTask,
                    comments: [...singleTask.comments, commentObject]
                }
            }else{
                return singleTask;
            }
        });
        return {
            ...state,
            tasks: commentedArray
        }
    }),
    // deleting comment from task
    on(deleteComment, (state: any, action)=>{
        const deleteCommentId = action.deleteCommentId;
        const taskId = action.taskId;
        const afterDeletedCommentArray = state.tasks.map((task: any)=>{
            if(task.id === taskId){
                return {
                    ...task,
                    comments: task.comments.filter((comment: any)=>
                    comment.id !== deleteCommentId)
                }
            }else{
                return task;
            }
        });
        return {
            ...state,
            tasks: afterDeletedCommentArray
        }
    }),
    // toggle archive state
    on(toggleArchiveState, (state: any, action)=>{
        const prevState = action.archiveState;
        return {
            ...state,
            archiveState: !prevState
        }
    }),
    // filter tasks based on search term
    on(filterTasks, (state: any, action)=>{
        const searchTerm = action.searchTerm;
        const existingTasks = [...state.tasks];
        const filteredTasks = existingTasks.filter((task: any)=>
            task.category.toLowerCase().startsWith(searchTerm.toLowerCase()) || 
            task.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        return {
            ...state,
            filteredTasks: filteredTasks,
            filterState: true
        }
    }),
    // switch filter state to false
    on(switchFilterState,(state: any, action)=>{
        return {
            ...state,
            filterState: false
        }
    }),
    // control theme state between dark and light themes
    on(controlThemeState, (state: any, action)=>{
        const initalThemeState = state.themeState;
        return {
            ...state,
            themeState: !initalThemeState
        }
    }),

    // receive categories and tasks for distribution
    on(passTasksByCategories, (state: any, action)=>{
        let categories: any = action.categories;
        let tasks = action.tasks;
        // distributing tasks to categories
        let categoryObject: any = {};
        for(let i = 0; i < categories.length; i++){
            categoryObject[categories[i].toLowerCase()] = [];
        };
        // injecting arrays 
        for(let index in tasks){
            const category = tasks[index].category.toLowerCase();
            if(categoryObject[category]){
                categoryObject[category] = [...categoryObject[category], tasks[index]];
            }else{
                categoryObject[category] = [];
            }
        }
        return {
            ...state,
            categoryTasks: categoryObject
        }
    })
 );

// returning the primary reducer as a callable value
export function taskReducer(state: any, action: any){
    return task_reducer(state, action);
}

