import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CareerModel, CourseModel } from '../models/course.model';
import { AlertsService } from '../../../../../core/services/alerts.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input()
  displayedColumns: string[] = [];

  @Input()
  dataSource: CourseModel[] | CareerModel[] = [];

  @Output()
  deleteCourseById = new EventEmitter();

  @Output()
  editCourseByID = new EventEmitter();

  constructor(private alert: AlertsService){}

  /* valida que tipo de tabla estamos dibujando para saber hacia donde responder */
  validateData(): boolean { 
    if (this.dataSource.length > 0 && this.dataSource[0]?.type =='course' ) {
      console.log('Tipo de modelo: CourseModel');
      return true;
    } else if (this.dataSource.length > 0 && this.dataSource[0]?.type =='course' ) {
      console.log('Tipo de modelo: CareerModel');
      return false;
    } else {
      // Tipo desconocido o dataSource está vacío
      console.log('Tipo de modelo desconocido');
      return false;
    }
  }

  delete(id: number) {
    this.validateData() ? this.deleteCourseById.emit(id) 
                        : this.alert.showInfo('En Contrucción') ;
  }

  edit(id: CourseModel | CareerModel) {
    this.validateData() ? this.editCourseByID.emit(id)
                        : this.alert.showInfo('En Contrucción') ;;
  }


}
