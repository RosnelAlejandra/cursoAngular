import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StudentModel } from '../../models/studens.model';
import { StudentService } from '../../../../../../core/services/student.service';
import { InscriptionService } from '../../../../../../core/services/inscription.service';
import { InscriptionModel } from '../../../inscriptions/models/inscriptions.model';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.scss'
})
export class PageDetailComponent {

  student?: StudentModel;
  dataSource: InscriptionModel[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['id', 'fullName', 'email'];

  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private inscriptionService: InscriptionService
    ){
      console.log(this.route.snapshot.params['id']);
      //console.log(this.route.snapshot.queryParams);

      this.getPageData();

  }

  getPageData(): void {

    this.loading = true
    forkJoin([
      this.studentService.getStudentById(this.route.snapshot.params['id']),
      this.inscriptionService.getInscriptionByStuden(this.route.snapshot.params['id']),
    ]).subscribe({
      next: (value) => {
        this.student = value[0]; 
        this.dataSource = value[1];
      },
      complete: () => {
        this.loading = false
      },
    });
  }

  getPaymentStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Pagado';
      case 3:
        return 'De Baja';
      default:
        return 'Desconocido';
    }
  }
}
