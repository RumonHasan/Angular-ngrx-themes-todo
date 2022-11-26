import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, } from '@angular/forms';
import { editTask, passTasksByCategories } from 'src/app/state/tasks.actions';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  editId!: any;
  // edit contents
  editTitle = new FormControl('');
  editDescription = new FormControl('');
  editCategory = new FormControl('');

  // local states
  afterEditCategories!: any;
  afterEditTasks!: any;

  constructor(
    private editDialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private taskStore: Store<{taskReducer: {editId: any,
      tasks: [], categories: []
    }}>,
  ) { 
    // fetching the edit ID
    this.taskStore.select('taskReducer').subscribe((data)=>
      this.editId = data.editId
    )
  }
  // edit dialog close
  onCloseDialogBox(){
    this.editDialogRef.close();
  }
  ngOnInit(): void {
  }
  // edit
  editTaskUI(){
    const editTitle = this.editTitle.getRawValue();
    const editDescription = this.editDescription.getRawValue();
    const editCategory = this.editCategory.getRawValue();
    const editedContent = {
      title: this.editTitle.getRawValue(),
      description: this.editDescription.getRawValue(),
      category: this.editCategory.getRawValue()
    };
    if((editTitle !== '' && editTitle !== null) && 
    (editCategory !== '' && editCategory !== null) &&
    (editDescription !== '' && editDescription !== null)){
      // passing edited content along with id
      this.taskStore.dispatch(editTask({updateId: this.editId, newContent: editedContent}))
      this.onCloseDialogBox();
      // refreshing the tasks categories
      this.taskStore.select('taskReducer').subscribe((data)=>{
        this.afterEditCategories = data.categories;
        this.afterEditTasks = data.tasks;
      }); // passing the edited tasks and categories
      this.taskStore.dispatch(passTasksByCategories({categories: this.afterEditCategories, tasks: this.afterEditTasks}));
      
    }else{
      console.log('edit form is empty');
    }
    this.editFormReset();
  }
  editFormReset(){
    this.editTitle.reset();
    this.editDescription.reset();
    this.editCategory.reset();
  }
}
