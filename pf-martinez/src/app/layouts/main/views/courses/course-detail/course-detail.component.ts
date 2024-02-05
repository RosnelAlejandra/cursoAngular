import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../../core/services/course.service';
import { CourseModel } from '../models/course.model';
import { InscriptionService } from '../../../../../core/services/inscription.service';
import { forkJoin } from 'rxjs';
import { InscriptionModel } from '../../inscriptions/models/inscriptions.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {

  course?: CourseModel;
  dataSource: InscriptionModel[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['id', 'fullName', 'email'];

  constructor(private route: ActivatedRoute,
    private courseService: CourseService,
    private inscriptionService: InscriptionService
    ){
      console.log(this.route.snapshot.params['id']);
      //console.log(this.route.snapshot.queryParams);

      this.getPageData();

  }

  getPageData(): void {

    this.loading = true
    forkJoin([
      this.courseService.getCourseById(this.route.snapshot.params['id']),
      this.inscriptionService.getInscriptionByCourse(this.route.snapshot.params['id']),
    ]).subscribe({
      next: (value) => {
        this.course = value[0]; 
        this.dataSource = value[1];
      },
      complete: () => {
        this.loading = false
      },
    });
  }

  getModalityName(modalityId: number): string {
    const modalities = ['Presencial', 'Online'];
    return modalities[modalityId - 1];
  }
  
  getStatusText(status: number): string {
    return status === 1 ? 'Activo' : 'Inactivo';
  }
}
