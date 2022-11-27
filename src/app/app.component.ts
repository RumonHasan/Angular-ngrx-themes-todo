import { Component } from '@angular/core';
import { Task } from './task/task';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { activateAllView, activateCategoryView, 
  controlThemeState, filterTasks, passTasksByCategories, turnToDefaultView } from './state/tasks.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-firebase-todo';
  todos: any = [];
  filteredTodos: any = [];
  // search term
  searchTerm = new FormControl('');
  selectedSearchCategory!: any;
  allSearch: string = 'All';
  // search categories: 
  categories: any = [];
  // filter state
  localFilterState: boolean = false;
  // theme state
  themeStateLocal!: boolean;
  // categorical tasks
  categoricalTasks!: object;

  //view variables
  views: any;
  currentViewState: string = ''; // current view state in words
  localCategoryView!: boolean;
  localAllView!: boolean;

  // inprogress list and done list
  doneList: any = [];
  inProgressList: any = [];

  constructor(
    private dialog: MatDialog,
    // getting the initial state from the task reducer
    private taskStore: Store<{taskReducer: {tasks: Task[], categories: [], 
      filterState: boolean, filteredTasks: Task[], themeState: boolean,
      categoryTasks: object, views:any, categoryView: boolean, allView: boolean}}>,
    private overlayContainer: OverlayContainer,
    ){}
  //function to open a dialog box for adding a new todo

  ngOnInit():void{
    // getting data from store
    this.taskStore.select('taskReducer').subscribe((data)=> 
      this.todos = data.tasks
    );
    // populating categories and creating a new set from array
    this.taskStore.select('taskReducer').subscribe((data)=>
      this.categories = [...new Set([...data.categories])]
    );
    // getting the filtered state
    this.taskStore.select('taskReducer').subscribe((data)=>
      this.localFilterState = data.filterState
    )
    // filtered tasks
    this.taskStore.select('taskReducer').subscribe((data)=>
      this.filteredTodos = data.filteredTasks
    );
    // getting the theme state
    this.taskStore.select('taskReducer').subscribe((data)=>
      this.themeStateLocal = data.themeState
    );
    // passing the categories and tasks for distribution... autorefresh
    this.taskStore.dispatch(passTasksByCategories({categories: this.categories, 
      tasks: this.todos}));
      // get the data from category based on tasks
    this.taskStore.select('taskReducer').subscribe((data)=>
        this.categoricalTasks = data.categoryTasks
    );
    // get the views
    this.taskStore.select('taskReducer').subscribe((data)=>
      this.views = data.views
    );
    // category views
    this.taskStore.select('taskReducer').subscribe((data)=>{
      this.localCategoryView = data.categoryView;
      this.localAllView = data.allView;
    }
    );
    // fetch the progress and inprogress tasks
    this.taskStore.select('taskReducer').subscribe((data)=>
      data.tasks.map((singleTask: any)=> 
        singleTask.inprogress === true ? this.doneList.push(singleTask) : 
        this.inProgressList.push(singleTask)
      )
    );
  }

  // drag and drop controls
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // open dialog 
  openDialog(){
    this.dialog.open(TaskDialogComponent,{
      // passing some dimensions
      width: '450px',
      height: '450px',
      data: 'right click'
    });
  };
  // search and filter tasks
  searchTasks(){
    const searchTerm = this.searchTerm.getRawValue();
    // custom search and switching back to default list
    if(searchTerm?.toLowerCase() === this.allSearch.toLowerCase()){
      this.taskStore.dispatch(filterTasks({searchTerm: searchTerm, filterState: this.localFilterState}));
      this.taskStore.dispatch(turnToDefaultView());
    }else{
      this.taskStore.dispatch(filterTasks({searchTerm: searchTerm, filterState: this.localFilterState}));
      this.taskStore.dispatch(turnToDefaultView());
    }
  };
  // theme toggle switch function
  toggleTheme(){
    this.taskStore.dispatch(controlThemeState());
  };

  // overlay switch by fetching the class from toggle theme
  themeChange(){
   this.toggleTheme();
   if(this.themeStateLocal){
    this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    this.overlayContainer.getContainerElement().classList.add('light-theme');
   }else{
    this.overlayContainer.getContainerElement().classList.remove('light-theme');
    this.overlayContainer.getContainerElement().classList.add('dark-theme');
   }
  }
  // get changes in view
  changeView(viewStateValue: any){
    const selectValue = viewStateValue.source.value;
    if(selectValue.toLowerCase() === 'categoryview'){
      this.taskStore.dispatch(activateCategoryView());
    }
    if(selectValue.toLowerCase() === 'all'){
      this.taskStore.dispatch(turnToDefaultView());
    } 
  }
}
