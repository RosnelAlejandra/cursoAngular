import { Component } from '@angular/core';
import { LoadingService } from '../../../../core/services/loading.service';
import { CourseService } from '../../../../core/services/course.service';
import { CareerService } from '../../../../core/services/career.service';
import { forkJoin } from 'rxjs';
import { CareerModel, CourseModel, ModalityModel } from './models/course.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormCourseComponent } from './form-course/form-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  panelOpenState = true;
  viewDetail = false;
  displayedColumnsCourse: string[] = ['id', 'name', 'durations', 'description', 'price', 'action'];
  dataSourceCourse: CourseModel[] = [];
  dataSourceCareer: CareerModel[] = [];
  modalities: ModalityModel[] = [];


  constructor(    
    private loadingService: LoadingService,
    private courseService: CourseService,
    private careerService: CareerService,
    public dialog: MatDialog){
      this.getPageData();
    }

  /* formulario de Cursos  */
  openDialogCourse() {
    const dialogRef = this.dialog.open(FormCourseComponent,{
      data: { edit: null, careers: this.dataSourceCareer, modalities: this.modalities },
    });
    /* recibimmos el resultado del formualerio  */
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.courseService.create(result, this.dataSourceCourse.length).subscribe({
          next: (r) => this.dataSourceCourse = r,
        });
      }
    });
  }


  getPageData(): void {
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.courseService.getCources(),
      this.careerService.getCareers(),
      this.courseService.getModalities(),
    ]).subscribe({
      next: (value) => {
        this.dataSourceCourse = value[0]; 
        this.dataSourceCareer = value[1];
        this.modalities = value[2];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

  deleteCourseById(id: number) {
    this.courseService.delete(id).subscribe({
      next: (courses) => {
        this.dataSourceCourse = [...courses];
      }
    })
  }

  editCourseByID(edit: CourseModel) {
    //console.log({edit});
    const dialogRef = this.dialog.open(FormCourseComponent,{
      data: { edit, careers: this.dataSourceCareer, modalities: this.modalities },
    });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.courseService.edit(result).subscribe({
            next: (r) => this.dataSourceCourse = r,
          });
        }
      });
  }



}
