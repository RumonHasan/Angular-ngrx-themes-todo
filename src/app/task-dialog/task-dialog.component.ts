import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ServicesService } from '../services.service';
import { addNewTask, passTasksByCategories, switchFilterState } from '../state/tasks.actions';
import { getRandomIdNumber } from '../state/tasks.state';
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  // new Task
  newTask!: any;

  // form inputs
  title = new FormControl('');
  description = new FormControl('');
  category = new FormControl('');
  customCategory = new FormControl('');
  // categories
  categoriesArray: any = [];
  // extra selected input
  extraCategoryInput: boolean = false;
  // category received
  categoryFromSelect: String = '';

  // new categories and tasks
  newCategories: any;
  newTasks: any;

  constructor( public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private categories: ServicesService,
    private controlCategoryInput: ServicesService,
    // accessing store
    private taskStore: Store<{taskReducer : {categories: [], tasks: []}}>) { 
      // receiving the changed state
      this.controlCategoryInput.getModifyToggleCategoryInput().subscribe(
        toggle => this.extraCategoryInput = toggle
      )
    }
  ngOnInit(): void {
    this.fetchCategoriesLocally();
  }
  fetchCategoriesLocally(){
    return this.categoriesArray = this.categories.fetchCategories();
  }
  // cancelling the dialog box
  onCanceCloseDialogBox():void{
    this.dialogRef.close();
  }
  // submitting data after creating a new task
  onSubmit(){
    // create the new task object
    const title = this.title.getRawValue();
    const description = this.description.getRawValue();
    const category = this.categoryFromSelect;
    const newId =  Date.now();
    try{
      // basic validation
      if((title !== null && title !== '') && (description !== null && description !== '')
       && (category !== null && description !== '')){
        this.newTask = {
          id: newId,
          title: title,
          description: description,
          category: category,
          inprogress: false,
          comments: [],
          archive: false
        }
        // passing on new task on the ngrx store
        this.taskStore.dispatch(addNewTask({newTask: this.newTask}));
        this.taskStore.select('taskReducer').subscribe(((data)=>{
            this.newCategories = data.categories;
            this.newTasks = data.tasks;
       }));
       this.taskStore.dispatch(passTasksByCategories({categories: this.newCategories, tasks: this.newTasks}));
       console.log(this.newCategories, this.newTasks);
        this.onCanceCloseDialogBox();
        this.taskStore.dispatch(switchFilterState());
    }else{
      return;
    }
    // resetting form after successful adding
    this.title.reset();
    this.description.reset();
    this.category.reset();
    }catch(error){
      console.log(error);
    }
  }
  // receive category selected from form
  receiveCategoryFromSelect(category:String){
     this.categoryFromSelect = category;
  }
  // adding custom category
  addCategory(){
    // updating categories
    const customCategoryText = this.customCategory.getRawValue();
    if(customCategoryText !== ''){
      this.categoriesArray = this.categories.addNewCategory(customCategoryText);
      this.fetchCategoriesLocally();
      this.closeCustomCategoryInput();
      this.customCategory.reset();
    }else{
      console.log('No category written');
    }
  }
  // close custom category component
  closeCustomCategoryInput(){
    this.extraCategoryInput = !this.extraCategoryInput;
    this.controlCategoryInput.toggleIt(this.extraCategoryInput);
  }

}
