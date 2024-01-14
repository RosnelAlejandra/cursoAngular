import { Component, Input, Output } from '@angular/core';
import { SectionList } from '../../layouts/main/models/menu.models';

@Component({
  selector: 'app-list-material',
  templateUrl: './list-material.component.html',
  styleUrl: './list-material.component.scss'
})
export class ListMaterialComponent {

  @Input()
  nameTitles: string;

  @Input() 
  listArray: SectionList[];

  constructor(){
    this.listArray = [];
    this.nameTitles = '';
  }

}
