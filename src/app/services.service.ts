import { Injectable } from '@angular/core';
import { Task } from './task/task';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  // dummy tasks
    // list of tasks
    // initial categories: dummy category
    categories:any = [
      'Science',
      'Math',
      'Physics',
      'AstroPhysics'
    ];
    //extra select field
    public toggleCategoryInput: BehaviorSubject<boolean> = new BehaviorSubject(false);

    // get categories
    fetchCategories(){
      return this.categories;
    }
    //get bool
    getModifyToggleCategoryInput():Observable<boolean>{
      return this.toggleCategoryInput.asObservable();
    }
    // toggle function
    toggleIt(param:boolean):void{
      this.toggleCategoryInput.next(param);
    }
    //add new category
    addNewCategory(category: any){
      const categories = [...this.categories];
      return this.categories = [...categories, category];
    }

  constructor() { }
}
