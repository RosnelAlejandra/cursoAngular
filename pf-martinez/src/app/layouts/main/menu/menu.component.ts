import { Component, Input } from '@angular/core';
import { SectionList } from './models/menu.models';
import { menuGeneral, menuStudents } from './mocks/data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  showFiller = false;

  @Input() 
  viewComponent: any;

  menu1: SectionList[] = menuStudents;
  menu2: SectionList[] = menuGeneral;
}
