import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskComponent } from './task/task.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './state/tasks.reducer';
import { EditDialogComponent } from './task/edit-dialog/edit-dialog.component';
import { CommentDialogComponent } from './task/comment-dialog/comment-dialog.component';
// firebase
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from './firebase/firebase_credentials';
import { InprogressTaskComponent } from './inprogress-task/inprogress-task.component';
import { CategoryTasksComponent } from './category-tasks/category-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskDialogComponent,
    CategoriesComponent,
    EditDialogComponent,
    CommentDialogComponent,
    InprogressTaskComponent,
    CategoryTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatAutocompleteModule,
    // reducer store module
    StoreModule.forRoot({
      taskReducer: taskReducer
    }),
    // // firebase imports
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // AngularFirestoreModule,
    // AngularFireDatabaseModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
