"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.EditDialogComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var forms_1 = require("@angular/forms");
var tasks_actions_1 = require("src/app/state/tasks.actions");
var EditDialogComponent = /** @class */ (function () {
    function EditDialogComponent(editDialogRef, data, taskStore) {
        var _this = this;
        this.editDialogRef = editDialogRef;
        this.data = data;
        this.taskStore = taskStore;
        // edit contents
        this.editTitle = new forms_1.FormControl('');
        this.editDescription = new forms_1.FormControl('');
        this.editCategory = new forms_1.FormControl('');
        // fetching the edit ID
        this.taskStore.select('taskReducer').subscribe(function (data) {
            return _this.editId = data.editId;
        });
    }
    // edit dialog close
    EditDialogComponent.prototype.onCloseDialogBox = function () {
        this.editDialogRef.close();
    };
    EditDialogComponent.prototype.ngOnInit = function () {
    };
    // edit
    EditDialogComponent.prototype.editTaskUI = function () {
        var editTitle = this.editTitle.getRawValue();
        var editDescription = this.editDescription.getRawValue();
        var editCategory = this.editCategory.getRawValue();
        var editedContent = {
            title: this.editTitle.getRawValue(),
            description: this.editDescription.getRawValue(),
            category: this.editCategory.getRawValue()
        };
        if ((editTitle !== '' && editTitle !== null) &&
            (editCategory !== '' && editCategory !== null) &&
            (editDescription !== '' && editDescription !== null)) {
            // passing edited content along with id
            this.taskStore.dispatch(tasks_actions_1.editTask({ updateId: this.editId, newContent: editedContent }));
            this.onCloseDialogBox();
        }
        else {
            console.log('edit form is empty');
        }
        this.editFormReset();
    };
    EditDialogComponent.prototype.editFormReset = function () {
        this.editTitle.reset();
        this.editDescription.reset();
        this.editCategory.reset();
    };
    EditDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-dialog',
            templateUrl: './edit-dialog.component.html',
            styleUrls: ['./edit-dialog.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], EditDialogComponent);
    return EditDialogComponent;
}());
exports.EditDialogComponent = EditDialogComponent;
