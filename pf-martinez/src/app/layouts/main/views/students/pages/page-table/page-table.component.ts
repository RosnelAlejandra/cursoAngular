import { Component, Input } from '@angular/core';
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

}
