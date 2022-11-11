"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var toolbar_1 = require("@angular/material/toolbar");
var card_1 = require("@angular/material/card");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var select_1 = require("@angular/material/select");
var input_1 = require("@angular/material/input");
var menu_1 = require("@angular/material/menu");
var list_1 = require("@angular/material/list");
var autocomplete_1 = require("@angular/material/autocomplete");
var form_field_1 = require("@angular/material/form-field");
var app_routing_module_1 = require("./app-routing.module");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var task_component_1 = require("./task/task.component");
var task_dialog_component_1 = require("./task-dialog/task-dialog.component");
var categories_component_1 = require("./categories/categories.component");
var store_1 = require("@ngrx/store");
var tasks_reducer_1 = require("./state/tasks.reducer");
var edit_dialog_component_1 = require("./task/edit-dialog/edit-dialog.component");
var comment_dialog_component_1 = require("./task/comment-dialog/comment-dialog.component");
// firebase
var compat_1 = require("@angular/fire/compat");
var auth_1 = require("@angular/fire/compat/auth");
var firestore_1 = require("@angular/fire/compat/firestore");
var database_1 = require("@angular/fire/compat/database");
var firebase_credentials_1 = require("./firebase/firebase_credentials");
var inprogress_task_component_1 = require("./inprogress-task/inprogress-task.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                task_component_1.TaskComponent,
                task_dialog_component_1.TaskDialogComponent,
                categories_component_1.CategoriesComponent,
                edit_dialog_component_1.EditDialogComponent,
                comment_dialog_component_1.CommentDialogComponent,
                inprogress_task_component_1.InprogressTaskComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                card_1.MatCardModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogModule,
                forms_1.FormsModule,
                form_field_1.MatFormFieldModule,
                forms_1.ReactiveFormsModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                menu_1.MatMenuModule,
                list_1.MatListModule,
                autocomplete_1.MatAutocompleteModule,
                // reducer store module
                store_1.StoreModule.forRoot({
                    taskReducer: tasks_reducer_1.taskReducer
                }),
                // firebase imports
                compat_1.AngularFireModule.initializeApp(firebase_credentials_1.environment.firebaseConfig),
                auth_1.AngularFireAuthModule,
                firestore_1.AngularFirestoreModule,
                firestore_1.AngularFirestoreModule,
                database_1.AngularFireDatabaseModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
