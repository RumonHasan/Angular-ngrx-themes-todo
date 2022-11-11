import { Component } from '@angular/core';
import { Task } from './task/task';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { controlThemeState, filterTasks, switchFilterState } from './state/tasks.actions';

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

  constructor(
    private dialog: MatDialog,
    // getting the initial state from the task reducer
    private taskStore: Store<{taskReducer: {tasks: Task[], categories: [], 
      filterState: boolean, filteredTasks: Task[], themeState: boolean}}>,
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
      this.taskStore.dispatch(switchFilterState());
    }else{
      this.taskStore.dispatch(filterTasks({searchTerm: searchTerm, filterState: this.localFilterState}));
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
}
