"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriesComponent = void 0;
var core_1 = require("@angular/core");
var CategoriesComponent = /** @class */ (function () {
    // switching control state
    function CategoriesComponent(controlSelectedCategory) {
        var _this = this;
        this.controlSelectedCategory = controlSelectedCategory;
        // getting categories
        this.categories = [];
        this.emitCategorySelected = new core_1.EventEmitter();
        // selected value
        this.selected = '';
        // extra category input
        this.categoryInput = false;
        this.controlSelectedCategory.getModifyToggleCategoryInput().subscribe(function (toggleExtraInput) { return _this.categoryInput = toggleExtraInput; });
    }
    CategoriesComponent.prototype.ngOnInit = function () {
    };
    // main toggle function
    CategoriesComponent.prototype.showCategoryInput = function () {
        this.categoryInput = !this.categoryInput;
        this.controlSelectedCategory.toggleIt(this.categoryInput);
    };
    // option functions
    CategoriesComponent.prototype.optionFunctions = function () {
        this.controlSelectedCategory.toggleIt(false);
        // sent category to tasks
        this.emitCategorySelected.emit(this.selected);
    };
    __decorate([
        core_1.Input()
    ], CategoriesComponent.prototype, "categories");
    __decorate([
        core_1.Output()
    ], CategoriesComponent.prototype, "emitCategorySelected");
    CategoriesComponent = __decorate([
        core_1.Component({
            selector: 'app-categories',
            templateUrl: './categories.component.html',
            styleUrls: ['./categories.component.css']
        })
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;
