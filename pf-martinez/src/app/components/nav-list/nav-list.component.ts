import { Component, Input } from '@angular/core';
import { SectionList } from '../../layouts/main/models/menu.models';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {

  @Input()
  nameTitles: string;

  @Input() 
  listArray: SectionList[];

  constructor(){
    this.listArray = [];
    this.nameTitles = '';
  }

}
