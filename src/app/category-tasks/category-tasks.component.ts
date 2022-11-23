import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-tasks',
  templateUrl: './category-tasks.component.html',
  styleUrls: ['./category-tasks.component.scss']
})
export class CategoryTasksComponent implements OnInit {
  // getting the categorical tasks
  @Input() categoryTasks: any;

  constructor() { }

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
}
