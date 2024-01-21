import { Component, ViewChild } from '@angular/core';
import { StudentModel } from './models/studens.model';
import { studentsArrayInitial } from './mocks/data.mocks';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  displayedColumns: string[] = ['id', 'fullName', 'email', 'date', 'course', 'career', 'pay', 'action'];

  dataSource: StudentModel[] = studentsArrayInitial.map((s: any) => { 
    return { ...s, dateIncription: new Date(s.dateIncription),
      courseName: s.course.map((c:any) => c.name).join(','),
      careerName: s.career.map((c: any) => c.name).join(','),
    }
  }) ;

  onStudentSubmiter(e: StudentModel): void {

    this.dataSource = [ 
      ...this.dataSource, 
      {   ...e, 
          //dateIncription: new Date(e.dateIncription), 
          id: this.dataSource.length + 1
      }];

    this.tabGroup.selectedIndex = 0;
  }

  deleteStudentById(id: number) {
    this.dataSource = this.dataSource.filter((s:any) => s.id !== id);
  }

}
