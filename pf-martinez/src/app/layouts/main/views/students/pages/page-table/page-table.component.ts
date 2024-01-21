import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentModel } from '../../models/studens.model';


@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styleUrl: './page-table.component.scss'
})
export class PageTableComponent {

  @Input()
  displayedColumns: string[] = [];

  @Input()
  dataSource: StudentModel[] = [];

  @Output()
  deleteStudentById = new EventEmitter();

  @Output()
  editStudentByID = new EventEmitter();


  deleteStudent(id: number) {
    console.log('deleteStudent', id);
    this.deleteStudentById.emit(id);
  }

  editStudent(id: number) {
    console.log('Desde la tabla: editStudent', id);
    this.editStudentByID.emit(id);
  }

}
