import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentModel } from './models/studens.model';
import { MatTabGroup } from '@angular/material/tabs';
import { StudentService } from '../../../../core/services/student.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin } from 'rxjs';
import { CareerService } from '../../../../core/services/career.service';
import { CourseService } from '../../../../core/services/course.service';
import { CareerModel, CourseModel } from '../courses/models/course.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  courses: CourseModel[] = [];
  careers: CareerModel[] = [];

  constructor(
    private studentService: StudentService, 
    private loadingService: LoadingService,
    private courseService: CourseService,
    private careerService: CareerService ) {}

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

  dataSource: StudentModel[] = [];

  ngOnInit(): void {
    /* cargamos los selectores  */
    this.getPageData();
  }
  
  /* se llaman la data de tabla de Estudiantes, Cursos y carreras  */
  getPageData(): void {
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.courseService.getCources(),
      this.careerService.getCareers(),
      this.studentService.getStudent(),
    ]).subscribe({
      next: (value) => {
        this.courses = value[0]; 
        this.careers = value[1];
        this.dataSource = value[2];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }


  onStudentSubmiter(e: StudentModel): void {

    console.log(`Student : edit ${this.edit} ${e.id} `)
    this.loadingService.setIsLoading(true);
    if (this.edit) {
      this.studentService.editStudent({...e}).subscribe({
        next: (students) => {
          console.log(students)
          this.dataSource = [...students];
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      })
      this.edit = false;
      this.studentDataEdit = {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        dateIncription: new Date(),
        course: [],
        career: [],
        statusPay: 0,
        numberPay: '',
      }
    } else {
      //this.dataSource = [ ...this.dataSource, {   ...e,  id: this.dataSource.length + 1}];
      this.studentService.createStudent({   ...e,  id: this.dataSource.length + 1}).subscribe({
        next: (students) => {
          this.dataSource = [...students];
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      })

    }


    this.tabGroup.selectedIndex = 0;
  }

  deleteStudentById(id: number) {
    //this.dataSource = this.dataSource.filter((s:any) => s.id !== id);
    this.loadingService.setIsLoading(true);
    this.studentService.deleteStudent(id).subscribe({
      next: (students) => {
        this.dataSource = [...students];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    })
  }

  /* envia al formulario la data del estudiante a editar */
  editStudentByID(id: number) {
    const student = this.dataSource.filter((s:any) => s.id === id);
    this.studentDataEdit = student[0];
    console.log("Recibe la data y la actualiza", this.studentDataEdit);
    this.tabGroup.selectedIndex = 1;
    this.edit = true;
  }

}
