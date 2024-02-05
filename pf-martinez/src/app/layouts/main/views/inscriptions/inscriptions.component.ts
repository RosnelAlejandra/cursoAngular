import { Component, ViewChild } from '@angular/core';
import {  FormControl, Validators } from '@angular/forms';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { CourseModel } from '../courses/models/course.model';
import { CourseService } from '../../../../core/services/course.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatStepper } from '@angular/material/stepper';
import { AlertsService } from '../../../../core/services/alerts.service';
import { InscriptionModel } from './models/inscriptions.model';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { StudentService } from '../../../../core/services/student.service';
import { StudentModel } from '../students/models/studens.model';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent {

  @ViewChild('stepper') stepper!: MatStepper;

  isEditable = false;

  courses: CourseModel[] = [];
  students: StudentModel[] = [];
  selectedCourse = 0;
  nameSelectedCourse = '';

  ctrlCourse = new FormControl('', Validators.required);
  filteredCourse: Observable<CourseModel[]>;

  ctrlStudent = new FormControl('', Validators.required);
  filteredStudent: Observable<StudentModel[]>;

  displayedColumns: string[] = ['id', 'fullName', 'email', 'action'];
  dataSource: InscriptionModel[] = [];

  constructor(
    private loadingService: LoadingService,
    private alert: AlertsService,
    private courseService: CourseService,
    private inscriptionService: InscriptionService,
    private studentService: StudentService
    ) {
      this.getPageData();

      this.filteredCourse = this.ctrlCourse.valueChanges.pipe(
        startWith(''),
        map(c => (c ? this._filterCourse(c) : this.courses.slice())),
      );

      this.filteredStudent = this.ctrlStudent.valueChanges.pipe(
        startWith(''),
        map(c => (c ? this._filterStudent(c) : this.students.slice())),
      );
  }


    getPageData(): void {
      this.loadingService.setIsLoading(true);
      forkJoin([
        this.courseService.getCources(),
        this.studentService.getStudent(),
      ]).subscribe({
        next: (value) => {
          this.courses = value[0]; 
          this.students = value[1];
        },
        complete: () => {
          this.loadingService.setIsLoading(false);
        },
      });
    }

    private _filterCourse(value: string): CourseModel[] {
      const filterValue = value.toString().toLowerCase();
      return this.courses.filter(c => c.name.toLowerCase().includes(filterValue));
    }

    private _filterStudent(value: string): StudentModel[] {
      const filterValue = value.toLowerCase();
      const filterData = this.students.filter(s => s.email.toLowerCase().includes(filterValue));
      //console.log(filterValue, this.students, {filterData}  );
      return filterData;
    }

    nextOne() {
      const seleted = this.courses.filter(c => c.id.toString().includes(this.ctrlCourse.value || ''));
      console.log(this.ctrlCourse.value, seleted);
      if (this.ctrlCourse.valid && seleted.length === 1) {
        this.selectedCourse =  seleted[0].id;
        this.nameSelectedCourse = seleted[0].name;
        this.inscriptionService.getInscriptionByCourse(seleted[0].id).subscribe({
          next: (r) => this.dataSource = r,
          complete: () => this.stepper.next()
          }
        )
        
      } else {
        this.alert.showInfo("Debe indicar Curso");
      }
    }

    deleteStudent(id: number) {

      this.inscriptionService.deleteInscription(id).subscribe({
        next: (i) => {
          this.dataSource = [...i];
        }
      })
    }
  
    addStudent() {

      /* datos basicos del estudiante seleccionado */
      const selectedStudent = this.students.filter(c => c.email.toLowerCase().includes(this.ctrlStudent.value || ''));
      console.log("Email", this.ctrlStudent.value );

      if(selectedStudent.length && selectedStudent[0].course.filter(c => c.id === this.selectedCourse ).length > 0  ){
        return this.alert.showError("Ya existe el estudiante seleccionado en este curso")
      }
      
      if(this.dataSource.filter(c => c.email === this.ctrlStudent.value ).length > 0){
        return this.alert.showError("Ya existe el estudiante seleccionado en este curso")
      }

      if(selectedStudent.length == 1 ){
        const dataCourse = {
          id: 0,
          studentId: selectedStudent[0].id,
          courseId: this.selectedCourse,
          firstName: selectedStudent[0].firstName,
          lastName: selectedStudent[0].lastName,
          email: selectedStudent[0].email,
        }
  
        this.inscriptionService.createInscription(dataCourse).subscribe({
          next: (inscrip) => {
            console.log(inscrip)
            this.dataSource = [...inscrip];
          }
        })

      }else{
        return this.alert.showError("ha ocurrido un error")
      }
  

     
    }

}
