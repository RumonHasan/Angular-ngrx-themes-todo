import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from './task';
import { deleteCategorySearch, deleteComment, deleteTask, editTaskDialogState, getCommentId, passTasksByCategories, switchFilterState, toggleArchiveState } from '../state/tasks.actions';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // basic input and output for sending and receiving
  @Input() task:Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  // receive category from select category
  taskComments!: any;
  // archive state
  localArchiveState!: boolean;
  // archive tasks local
  archivedTasksRef!: any;

  // local categories and tasks after deletion
  afterDeleteCategories!: [];
  afterDeleteTasks!: [];

  constructor(
    // task reducer store
    private taskStore: Store<{taskReducer: {editDialogOpen: boolean, archiveState: boolean, tasks: [], categories:[]}}>,
    private editDialog: MatDialog,
    private commentDialog: MatDialog,
    // private fireDb: AngularFirestore
  ) { 
     // get archived tasks
  //  this.archivedTasksRef = this.fireDb.collection('tasks');
  }
  ngOnInit(): void {
    this.taskComments = this.task!.comments;
    // get the archive state
    this.taskStore.select('taskReducer').subscribe((data)=>
      this.localArchiveState = data.archiveState
    );
  }
  // open dialog
  openEditDialog(){
    this.editDialog.open(EditDialogComponent, {
      width: '450px',
      height: '450px',
      data: 'right click'
    })
  }
  // display comment box
  displayCommentBox(id: any){
    this.commentDialog.open(CommentDialogComponent,{
      width: '400px',
      height: '200px',
      data: 'right click'
    });
    // dispatching the id
    this.taskStore.dispatch(getCommentId({commentId: id}))
  }

  // get delete comment id
  deleteCommentId(id: any){
    this.taskStore.dispatch(deleteComment({deleteCommentId: id, taskId: this.task?.id}))
  }

  // add to firebase
  addToDatabase(task: any){
    // archiving text
    Swal.fire({
      title: 'Do you want to archive Task?',
      text: 'Archiving task will let you store the task.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Archive Task',
      cancelButtonText: 'Do not store!'
    }).then((result)=>{
      if(result.value){
        // this.fireDb.collection('tasks').add(task);
        this.taskStore.dispatch(toggleArchiveState({archiveState: this.localArchiveState}))
      }else{
        if(result.dismiss === Swal.DismissReason.cancel){
          Swal.fire('Cancelled', 'Task is not Saved', 'error')
        }
      }
    })
  }
  // get edit content
  getEditContent(content: any){
      const editId = parseInt(content.id);
      Swal.fire({
        title: 'Are you sure you want to Edit',
        text: 'Editing will let you change the content',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Edit Task',
        cancelButtonText: 'Do not Edit',
      }).then((result)=>{
        if(result.value){
          // edit logic function
          this.openEditDialog();
          this.taskStore.dispatch(editTaskDialogState({editStateId: editId}))
        }else if(result.dismiss === Swal.DismissReason.cancel){
          Swal.fire('Cancelled', 'Task is unchanged', 'error')
        }
      })
  }
  // get delete id
  getDeleteId(id:any, category: any){
      const deleteId = parseInt(id);
      Swal.fire({
        title: 'Are you sure you want to delete?',
        text: "You will not be able to recover",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Go Ahead',
        cancelButtonText: 'No keep it',
      }).then((result)=>{
        if(result.value){
          // delete sub functions when the yes button
          this.taskStore.dispatch(deleteTask({deleteId: deleteId, deleteCategory: category}));
          this.taskStore.dispatch(deleteCategorySearch({deleteCategoryId: id, deleteCategory: category}));
          this.taskStore.dispatch(switchFilterState());
          // switching category states
          this.taskStore.select('taskReducer').subscribe((data: any)=>
            {
              this.afterDeleteCategories = data.categories;
              this.afterDeleteTasks = data.tasks;
            }
          );
          // pass it on to the next categories and tasks
          this.taskStore.dispatch(passTasksByCategories({categories: this.afterDeleteCategories, tasks: this.afterDeleteTasks}));
          Swal.fire(
            'Deleted',
            'Task has been deleted',
            'success'
          )
        }else if(result.dismiss === Swal.DismissReason.cancel){
          Swal.fire('Cancelled', 'Task is safe', 'error');
        }
      })
  }
}
