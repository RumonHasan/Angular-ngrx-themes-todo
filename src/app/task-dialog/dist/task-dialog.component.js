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
exports.TaskDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var tasks_actions_1 = require("../state/tasks.actions");
var TaskDialogComponent = /** @class */ (function () {
    function TaskDialogComponent(dialogRef, data, categories, controlCategoryInput, 
    // accessing store
    taskStore) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.categories = categories;
        this.controlCategoryInput = controlCategoryInput;
        this.taskStore = taskStore;
        // form inputs
        this.title = new forms_1.FormControl('');
        this.description = new forms_1.FormControl('');
        this.category = new forms_1.FormControl('');
        this.customCategory = new forms_1.FormControl('');
        // categories
        this.categoriesArray = [];
        // extra selected input
        this.extraCategoryInput = false;
        // category received
        this.categoryFromSelect = '';
        // receiving the changed state
        this.controlCategoryInput.getModifyToggleCategoryInput().subscribe(function (toggle) { return _this.extraCategoryInput = toggle; });
    }
    TaskDialogComponent.prototype.ngOnInit = function () {
        this.fetchCategoriesLocally();
    };
    TaskDialogComponent.prototype.fetchCategoriesLocally = function () {
        return this.categoriesArray = this.categories.fetchCategories();
    };
    // cancelling the dialog box
    TaskDialogComponent.prototype.onCanceCloseDialogBox = function () {
        this.dialogRef.close();
    };
    // submitting data after creating a new task
    TaskDialogComponent.prototype.onSubmit = function () {
        // create the new task object
        var title = this.title.getRawValue();
        var description = this.description.getRawValue();
        var category = this.categoryFromSelect;
        var newId = Date.now();
        try {
            // basic validation
            if ((title !== null && title !== '') && (description !== null && description !== '')
                && (category !== null && description !== '')) {
                this.newTask = {
                    id: newId,
                    title: title,
                    description: description,
                    category: category,
                    inprogress: false,
                    comments: [],
                    archive: false
                };
                // passing on new task on the ngrx store
                this.taskStore.dispatch(tasks_actions_1.addNewTask({ newTask: this.newTask }));
                this.onCanceCloseDialogBox();
                this.taskStore.dispatch(tasks_actions_1.switchFilterState());
            }
            else {
                return;
            }
            // resetting form after successful adding
            this.title.reset();
            this.description.reset();
            this.category.reset();
        }
        catch (error) {
            console.log(error);
        }
    };
    // receive category selected from form
    TaskDialogComponent.prototype.receiveCategoryFromSelect = function (category) {
        this.categoryFromSelect = category;
    };
    // adding custom category
    TaskDialogComponent.prototype.addCategory = function () {
        // updating categories
        var customCategoryText = this.customCategory.getRawValue();
        if (customCategoryText !== '') {
            this.categoriesArray = this.categories.addNewCategory(customCategoryText);
            this.fetchCategoriesLocally();
            this.closeCustomCategoryInput();
            this.customCategory.reset();
        }
        else {
            console.log('No category written');
        }
    };
    // close custom category component
    TaskDialogComponent.prototype.closeCustomCategoryInput = function () {
        this.extraCategoryInput = !this.extraCategoryInput;
        this.controlCategoryInput.toggleIt(this.extraCategoryInput);
    };
    TaskDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-task-dialog',
            templateUrl: './task-dialog.component.html',
            styleUrls: ['./task-dialog.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], TaskDialogComponent);
    return TaskDialogComponent;
}());
exports.TaskDialogComponent = TaskDialogComponent;
