import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, } from '@angular/forms';
import { editTask } from 'src/app/state/tasks.actions';
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

  constructor(
    private editDialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private taskStore: Store<{taskReducer: {editId: any}}>,
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
