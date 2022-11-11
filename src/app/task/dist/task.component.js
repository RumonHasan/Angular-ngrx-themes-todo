"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaskComponent = void 0;
var core_1 = require("@angular/core");
var tasks_actions_1 = require("../state/tasks.actions");
var sweetalert2_1 = require("sweetalert2");
var edit_dialog_component_1 = require("./edit-dialog/edit-dialog.component");
var comment_dialog_component_1 = require("./comment-dialog/comment-dialog.component");
var TaskComponent = /** @class */ (function () {
    function TaskComponent(
    // task reducer store
    taskStore, editDialog, commentDialog, fireDb) {
        this.taskStore = taskStore;
        this.editDialog = editDialog;
        this.commentDialog = commentDialog;
        this.fireDb = fireDb;
        // basic input and output for sending and receiving
        this.task = null;
        this.edit = new core_1.EventEmitter();
        // get archived tasks
        this.archivedTasksRef = this.fireDb.collection('tasks');
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.taskComments = this.task.comments;
        // get the archive state
        this.taskStore.select('taskReducer').subscribe(function (data) {
            return _this.localArchiveState = data.archiveState;
        });
    };
    // open dialog
    TaskComponent.prototype.openEditDialog = function () {
        this.editDialog.open(edit_dialog_component_1.EditDialogComponent, {
            width: '450px',
            height: '450px',
            data: 'right click'
        });
    };
    // display comment box
    TaskComponent.prototype.displayCommentBox = function (id) {
        this.commentDialog.open(comment_dialog_component_1.CommentDialogComponent, {
            width: '400px',
            height: '200px',
            data: 'right click'
        });
        // dispatching the id
        this.taskStore.dispatch(tasks_actions_1.getCommentId({ commentId: id }));
    };
    // get delete comment id
    TaskComponent.prototype.deleteCommentId = function (id) {
        var _a;
        this.taskStore.dispatch(tasks_actions_1.deleteComment({ deleteCommentId: id, taskId: (_a = this.task) === null || _a === void 0 ? void 0 : _a.id }));
    };
    // add to firebase
    TaskComponent.prototype.addToDatabase = function (task) {
        var _this = this;
        // archiving text
        sweetalert2_1["default"].fire({
            title: 'Do you want to archive Task?',
            text: 'Archiving task will let you store the task.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Archive Task',
            cancelButtonText: 'Do not store!'
        }).then(function (result) {
            if (result.value) {
                _this.fireDb.collection('tasks').add(task);
                _this.taskStore.dispatch(tasks_actions_1.toggleArchiveState({ archiveState: _this.localArchiveState }));
            }
            else {
                if (result.dismiss === sweetalert2_1["default"].DismissReason.cancel) {
                    sweetalert2_1["default"].fire('Cancelled', 'Task is not Saved', 'error');
                }
            }
        });
    };
    // get edit content
    TaskComponent.prototype.getEditContent = function (content) {
        var _this = this;
        var editId = parseInt(content.id);
        sweetalert2_1["default"].fire({
            title: 'Are you sure you want to Edit',
            text: 'Editing will let you change the content',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Edit Task',
            cancelButtonText: 'Do not Edit'
        }).then(function (result) {
            if (result.value) {
                // edit logic function
                _this.openEditDialog();
                _this.taskStore.dispatch(tasks_actions_1.editTaskDialogState({ editStateId: editId }));
            }
            else if (result.dismiss === sweetalert2_1["default"].DismissReason.cancel) {
                sweetalert2_1["default"].fire('Cancelled', 'Task is unchanged', 'error');
            }
        });
    };
    // get delete id
    TaskComponent.prototype.getDeleteId = function (id, category) {
        var _this = this;
        var deleteId = parseInt(id);
        sweetalert2_1["default"].fire({
            title: 'Are you sure you want to delete?',
            text: "You will not be able to recover",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes Go Ahead',
            cancelButtonText: 'No keep it'
        }).then(function (result) {
            if (result.value) {
                _this.taskStore.dispatch(tasks_actions_1.deleteTask({ deleteId: deleteId, deleteCategory: category }));
                _this.taskStore.dispatch(tasks_actions_1.deleteCategorySearch({ deleteCategoryId: id, deleteCategory: category }));
                _this.taskStore.dispatch(tasks_actions_1.switchFilterState());
                sweetalert2_1["default"].fire('Deleted', 'Task has been deleted', 'success');
            }
            else if (result.dismiss === sweetalert2_1["default"].DismissReason.cancel) {
                sweetalert2_1["default"].fire('Cancelled', 'Task is safe', 'error');
            }
        });
    };
    __decorate([
        core_1.Input()
    ], TaskComponent.prototype, "task");
    __decorate([
        core_1.Output()
    ], TaskComponent.prototype, "edit");
    TaskComponent = __decorate([
        core_1.Component({
            selector: 'app-task',
            templateUrl: './task.component.html',
            styleUrls: ['./task.component.css']
        })
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
