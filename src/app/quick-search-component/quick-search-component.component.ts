import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-quick-search-component',
  templateUrl: './quick-search-component.component.html',
  styleUrls: ['./quick-search-component.component.scss']
})
export class QuickSearchComponentComponent implements OnInit {
  public searchData = new FormControl('');
  constructor() { }

  ngOnInit(): void {
  }

}
