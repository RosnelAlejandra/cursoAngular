import { Component } from '@angular/core';
import { StudentsComponent } from './views/students/students.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  studentComponent = StudentsComponent;
}
