import { Component } from '@angular/core';
import { StudentModel } from './models/studens.model';
import { studentsArrayInitial } from './mocks/data.mocks';
import { dataCareers, dataCourse } from '../courses/mocks/course.mock';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {


  displayedColumns: string[] = ['id', 'fullName', 'email', 'date', 'course', 'career', 'pay'];

  

  dataSource: StudentModel[] = studentsArrayInitial.map((s: any) => { 
    let data = { ...s, dateInscription: new Date(s.dateIncription) }
    const activeCourse = dataCourse.filter(c => c.status === 1);
    const activeCareer = dataCareers.filter(c => c.status === 1);
    const resultCourse = activeCourse.filter((course: any) => data.course.includes(course.id)  );
    const resultCareer = activeCareer.filter((career: any) => data.career.includes(career.id)  );

    data = { ...data, 
            courseName: resultCourse.length > 0 ? resultCourse.map(c => c.name).join(', ') : 'Sin Cursos Activos', 
            pay: data.statusPay == 1 ? 'Pendiente por Pago' : 'Pagado',
            careerName: resultCareer.length > 0 ? resultCareer.map(c => c.name).join(', '): 'Sin Carrera Activos',  };
    return data 
  }) ;

  onStudentSubmiter(e: StudentModel): void {
    //se debe redefinir la tabla para que se muestre
    this.dataSource = [...this.dataSource, { ...e, id: this.dataSource.length + 1}];
  }

}
