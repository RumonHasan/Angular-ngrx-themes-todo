import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addCommentToTask } from 'src/app/state/tasks.actions';
@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  // comment text
  comment = new FormControl('');
  // commend task id
  commentTaskId!: any;

  constructor(
    private commentStore: Store<{taskReducer: {commentId: any}}>,
    private commentDialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    // passing on the comment Id to the reducer function for adding
    this.commentStore.select('taskReducer').subscribe((data)=>
      this.commentTaskId = data.commentId
    )
  }
  ngOnInit(): void {
  }
  // comment submission
  submitComment(){
    if(this.comment.getRawValue() !== null && this.comment.getRawValue()){
      this.commentStore.dispatch(addCommentToTask({comment: this.comment.getRawValue(), 
        commentTaskId: this.commentTaskId}));
      // closing box after submission
      this.commentDialogRef.close();
    }else{
      console.log('You must type a comment in order to submit')
    }
  }

}
