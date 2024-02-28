import { Component, Input } from '@angular/core';
import { SectionListNav } from '../../layouts/main/models/menu.models';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {

  @Input()
  nameTitles: string;

  @Input() 
  listArray: SectionListNav[];

  constructor(){
    this.listArray = [];
    this.nameTitles = '';
  }

}
