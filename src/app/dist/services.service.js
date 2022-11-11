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
exports.ServicesService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ServicesService = /** @class */ (function () {
    function ServicesService() {
        // dummy tasks
        // list of tasks
        // initial categories: dummy category
        this.categories = [
            'Science',
            'Math',
            'Physics',
            'AstroPhysics'
        ];
        //extra select field
        this.toggleCategoryInput = new rxjs_1.BehaviorSubject(false);
    }
    // get categories
    ServicesService.prototype.fetchCategories = function () {
        return this.categories;
    };
    //get bool
    ServicesService.prototype.getModifyToggleCategoryInput = function () {
        return this.toggleCategoryInput.asObservable();
    };
    // toggle function
    ServicesService.prototype.toggleIt = function (param) {
        this.toggleCategoryInput.next(param);
    };
    //add new category
    ServicesService.prototype.addNewCategory = function (category) {
        var categories = __spreadArrays(this.categories);
        return this.categories = __spreadArrays(categories, [category]);
    };
    ServicesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServicesService);
    return ServicesService;
}());
exports.ServicesService = ServicesService;
