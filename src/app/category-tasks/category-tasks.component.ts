import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { EditDialogComponent } from '../task/edit-dialog/edit-dialog.component';
// task reducer
import { deleteTask, deleteCategorySearch, switchFilterState, passTasksByCategories, editTaskDialogState } from '../state/tasks.actions';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-category-tasks',
  templateUrl: './category-tasks.component.html',
  styleUrls: ['./category-tasks.component.scss']
})
export class CategoryTasksComponent implements OnInit {
  // getting the categorical tasks
  @Input() categoryTasks: any;

  // local variables
  afterDeleteCategories: any;
  afterDeleteTasks: any;
  constructor(
    private taskStore: Store<{taskReducer:{categories: [], tasks:[]}}>,
    private editDialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.categoryTasks);
  }
  // get object values of arrays
  fetchObjectValues(category: any){
   return this.categoryTasks[category] && this.categoryTasks[category];
  }
  // header formatter function
  textFormatter(header:any){
    const headerArray = header.split('');
    const newHeader =  headerArray.map((letter:any, index: number)=> 
      index === 0 ? letter.toUpperCase() : letter
    );
    return newHeader.join('');
  }

  // delete from category
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
  };
  // edit function from within category view
    // open dialog
    openEditDialog(){
      this.editDialog.open(EditDialogComponent, {
        width: '450px',
        height: '450px',
        data: 'right click'
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

}
