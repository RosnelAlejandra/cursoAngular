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

  edit: boolean = false;

  studentDataEdit: StudentModel ={
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    dateIncription: new Date(),
    course: [],
    career: [],
    statusPay: 0,
    numberPay: '',
  };

  displayedColumns: string[] = ['id', 'fullName', 'email', 'date', 'course', 'career', 'state', 'pay', 'action'];

  dataSource: StudentModel[] = studentsArrayInitial.map((s: any) => { 
    return { ...s, dateIncription: new Date(s.dateIncription)}
  }) ;

  onStudentSubmiter(e: StudentModel): void {

    console.log(`Student : edit ${this.edit} ${e.id} `)

    if (this.edit) {
      this.dataSource = this.dataSource.map((data: any) => {
        if(data.id === e.id){
          return { ...e}
        }
        return data;
      });
      this.edit = false;
    } else {
      this.dataSource = [ 
        ...this.dataSource, 
        {   ...e,  id: this.dataSource.length + 1}
      ];
    }


    this.tabGroup.selectedIndex = 0;
  }

  deleteStudentById(id: number) {
    this.dataSource = this.dataSource.filter((s:any) => s.id !== id);
  }

  editStudentByID(id: number) {
    const student = this.dataSource.filter((s:any) => s.id === id);
    this.studentDataEdit = student[0];
    console.log("Recibe la data y la actualiza", this.studentDataEdit);
    this.tabGroup.selectedIndex = 1;
    this.edit = true;
  }

}
