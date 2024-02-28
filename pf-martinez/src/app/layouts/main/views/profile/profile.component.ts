import { Component } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { UsersModel } from '../users/models/models';
import { AuthService } from '../../../../core/services/auth.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { CourseService } from '../../../../core/services/course.service';
import { CareerService } from '../../../../core/services/career.service';
import {  ModalityModel } from '../courses/models/course.model';
import { SectionList } from '../../models/menu.models';
import { ProfileState } from '../../../../core/store/profile/reducers';
import { Store } from '@ngrx/store';
import { selectProfile } from '../../../../core/store/profile/selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  dataCourse: SectionList[] = [];
  dataCareer: SectionList[] = [];
  modalities: ModalityModel[] = [];
  loading: boolean = false;

  profile$: Observable<ProfileState | null>;

  constructor(
    private loadingService: LoadingService,
    private courseService: CourseService,
    private careerService: CareerService,
    private store: Store,
    ){
      this.profile$ = this.store.select(selectProfile) 
      this.getPageData();
  }

  getPageData(): void {
    this.loadingService.setIsLoading(true);
    forkJoin([
      this.courseService.getCources(),
      this.careerService.getCareers(),
      this.courseService.getModalities(),
    ]).subscribe({
      next: (value) => {
        this.dataCourse = value[0].map((value) =>{ return { 
              name: value.name, 
              start: new Date(value.schedule.start),
              description: value.description
             } }); 
        this.dataCareer = value[1].map((value) =>{ return { 
          name: value.name, 
          description: value.description
         } }); ;
        this.modalities = value[2];
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }

}
