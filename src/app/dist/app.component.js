"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var task_dialog_component_1 = require("./task-dialog/task-dialog.component");
var forms_1 = require("@angular/forms");
var tasks_actions_1 = require("./state/tasks.actions");
var AppComponent = /** @class */ (function () {
    function AppComponent(dialog, 
    // getting the initial state from the task reducer
    taskStore, fireDb) {
        this.dialog = dialog;
        this.taskStore = taskStore;
        this.fireDb = fireDb;
        this.title = 'Angular-firebase-todo';
        this.todos = [];
        this.filteredTodos = [];
        // search term
        this.searchTerm = new forms_1.FormControl('');
        this.allSearch = 'All';
        // search categories: 
        this.categories = [];
        // filter state
        this.localFilterState = false;
    }
    //function to open a dialog box for adding a new todo
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // getting data from store
        this.taskStore.select('taskReducer').subscribe(function (data) {
            return _this.todos = data.tasks;
        });
        // populating categories and creating a new set from array
        this.taskStore.select('taskReducer').subscribe(function (data) {
            return _this.categories = __spreadArrays(new Set(__spreadArrays(data.categories)));
        });
        // getting the filtered state
        this.taskStore.select('taskReducer').subscribe(function (data) {
            return _this.localFilterState = data.filterState;
        });
        // filtered tasks
        this.taskStore.select('taskReducer').subscribe(function (data) {
            return _this.filteredTodos = data.filteredTasks;
        });
        // getting the theme state
        this.taskStore.select('taskReducer').subscribe(function (data) {
            return _this.themeStateLocal = data.themeState;
        });
    };
    // open dialog 
    AppComponent.prototype.openDialog = function () {
        this.dialog.open(task_dialog_component_1.TaskDialogComponent, {
            // passing some dimensions
            width: '450px',
            height: '450px',
            data: 'right click'
        });
    };
    ;
    // search and filter tasks
    AppComponent.prototype.searchTasks = function () {
        var searchTerm = this.searchTerm.getRawValue();
        // custom search and switching back to default list
        if ((searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.toLowerCase()) === this.allSearch.toLowerCase()) {
            this.taskStore.dispatch(tasks_actions_1.switchFilterState());
        }
        else {
            this.taskStore.dispatch(tasks_actions_1.filterTasks({ searchTerm: searchTerm, filterState: this.localFilterState }));
        }
    };
    ;
    // theme toggle
    AppComponent.prototype.toggleTheme = function () {
        this.taskStore.dispatch(tasks_actions_1.controlThemeState());
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
