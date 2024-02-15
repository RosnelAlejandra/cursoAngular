import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentModel } from '../../models/studens.model';
import { AuthService } from '../../../../../../core/services/auth.service';
import { UsersModel } from '../../../users/models/models';


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

  @Output()
  viewStudentByID = new EventEmitter();

  user: UsersModel | null = null;

  constructor(private authService: AuthService){
        this.authService.getUserLogged().subscribe({
          next: (u) => {
            this.user = u;
          }
        })
  }

  deleteStudent(id: number) {
    console.log('deleteStudent', id);
    this.deleteStudentById.emit(id);
  }

  editStudent(id: number) {
    console.log('Desde la tabla: editStudent', id);
    this.editStudentByID.emit(id);
  }

  view(id: number) {
    this.viewStudentByID.emit(id)     
  }


}
