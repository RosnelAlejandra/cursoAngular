import { Pipe, PipeTransform } from '@angular/core';
import { StudentModel } from '../../layouts/main/views/students/models/studens.model';

@Pipe({
  name: 'studentData'
})
export class StudentDataPipe implements PipeTransform {

  transform(student: StudentModel, 
            data: number,
            ...args: unknown[]): unknown {

    /* devuelve el nombre concatenado */
    if(data === 1 ){
      return student.firstName + ' ' + student.lastName
    }

    /* devuelve los cursos comprados  */
    if (data === 2) {
      return student.course.map(c => c.name).join(',');
    }

    /* devuelve los carreras comprados  */
    if (data === 3) {
      return student.career.map(c => c.name).join(',');
    }

    /* estado del pago */
    if (data === 4) {
      return student.statusPay == 1 ? 'Pendiente por Pago' : 'Pagado'
    }

    return null;
  }

}
