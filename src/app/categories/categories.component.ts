import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  // getting categories
  @Input() categories:any = [];
  @Output() emitCategorySelected = new EventEmitter();
  // selected value
  selected: String = '';
  // extra category input
  categoryInput: boolean = false;
  // switching control state
  constructor(
    private controlSelectedCategory: ServicesService
  ) {
    this.controlSelectedCategory.getModifyToggleCategoryInput().subscribe(
      toggleExtraInput => this.categoryInput = toggleExtraInput
    )
   }
  ngOnInit(): void {
  }
  // main toggle function
  showCategoryInput(){
    this.categoryInput = !this.categoryInput;
    this.controlSelectedCategory.toggleIt(this.categoryInput);
  }
  // option functions
  optionFunctions(){
    this.controlSelectedCategory.toggleIt(false);
    // sent category to tasks
    this.emitCategorySelected.emit(this.selected);
  }

}
