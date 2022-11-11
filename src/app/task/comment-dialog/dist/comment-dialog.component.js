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
exports.CommentDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var tasks_actions_1 = require("src/app/state/tasks.actions");
var CommentDialogComponent = /** @class */ (function () {
    function CommentDialogComponent(commentStore, commentDialogRef, data) {
        var _this = this;
        this.commentStore = commentStore;
        this.commentDialogRef = commentDialogRef;
        this.data = data;
        // comment text
        this.comment = new forms_1.FormControl('');
        // passing on the comment Id to the reducer function for adding
        this.commentStore.select('taskReducer').subscribe(function (data) {
            return _this.commentTaskId = data.commentId;
        });
    }
    CommentDialogComponent.prototype.ngOnInit = function () {
    };
    // comment submission
    CommentDialogComponent.prototype.submitComment = function () {
        if (this.comment.getRawValue() !== null && this.comment.getRawValue()) {
            this.commentStore.dispatch(tasks_actions_1.addCommentToTask({ comment: this.comment.getRawValue(),
                commentTaskId: this.commentTaskId }));
            // closing box after submission
            this.commentDialogRef.close();
        }
        else {
            console.log('You must type a comment in order to submit');
        }
    };
    CommentDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-comment-dialog',
            templateUrl: './comment-dialog.component.html',
            styleUrls: ['./comment-dialog.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], CommentDialogComponent);
    return CommentDialogComponent;
}());
exports.CommentDialogComponent = CommentDialogComponent;
