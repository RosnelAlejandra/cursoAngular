import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CareerModel, CourseModel } from '../models/course.model';
import { AlertsService } from '../../../../../core/services/alerts.service';
import { UsersModel } from '../../users/models/models';
import { AuthService } from '../../../../../core/services/auth.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input()
  displayedColumns: string[] = [];

  @Input()
  dataSource: CourseModel[] = [];

  @Output()
  deleteCourseById = new EventEmitter();

  @Output()
  editCourseByID = new EventEmitter();

  user: UsersModel | null = null;

  constructor(private authService: AuthService,private alert: AlertsService){
        this.authService.getUserLogged().subscribe({
          next: (u) => {
            this.user = u;
          }
        })
  }

  delete(id: number) {
   this.deleteCourseById.emit(id)  ;
  }

  edit(id: CourseModel | CareerModel) {
    this.editCourseByID.emit(id);
  }


}
