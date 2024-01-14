import { Component } from '@angular/core';
import { StudentsComponent } from './views/students/students.component';
import { SectionList } from './models/menu.models';
import { menuGeneral, menuStudents } from './mocks/data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFiller = false;

  menu1: SectionList[] = menuStudents;
  menu2: SectionList[] = menuGeneral;
  
}
