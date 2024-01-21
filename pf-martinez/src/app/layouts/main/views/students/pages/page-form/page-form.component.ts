import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dataCareers, dataCourse } from '../../../courses/mocks/course.mock';
import { CareerModel, CourseModel } from '../../../courses/models/course.model';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrl: './page-form.component.scss'
})
export class PageFormComponent {

  userForm: FormGroup;
  amountCareer: number = 0;
  amountCourse: number = 0;
  amount: number = 0;

  /* avisamos al padre el cambio en el formulario */
  @Output()
  userSubmited = new EventEmitter();


  courses: CourseModel[] = dataCourse;
  careers: CareerModel[] = dataCareers;

  constructor(private fb: FormBuilder){
    this.userForm = this.fb.group({
      firstName: this.fb.control('', Validators.compose([
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(20), 
        Validators.pattern('[a-zA-Z]')
    ])),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.email),
      course: this.fb.control([]),
      career: this.fb.control([]),
      numberPay: this.fb.control(''),
    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  ngOnInit(): void {
  
    this.userForm.get('career')?.valueChanges.subscribe((selected) => {
      this.totalPay(selected, 1);
    });
    this.userForm.get('course')?.valueChanges.subscribe((selected) => {
      this.totalPay(selected, 2);
    });
  }

  totalPay(selected: any[], type: number) {
   //console.log('seleccionadas:', selected);
    if(type === 1){
      this.amountCareer = 0;
      for (let i = 0; i < selected.length; i++) {
        const element = this.careers.filter(c => c.id === selected[i]);
        this.amountCareer = this.amountCareer + element[0].price;
      }
    }
    if(type === 2){
      this.amountCourse = 0;
      for (let i = 0; i < selected.length; i++) {
        const element = this.courses.filter(c => c.id === selected[i]);
        this.amountCourse = this.amountCourse + element[0].price;
      }
    }

    this.amount = this.amountCareer + this.amountCourse;
    
  }

  onSubmit(): void {
    const formValues = this.userForm.value;
    console.log('formValues', formValues);
    const today = new Date();
    let selected = formValues.course;
    let course = [];
    for (let i = 0; i < formValues.course.length; i++) {
      const element = this.courses.filter(c => c.id === selected[i]);
      course.push({ id: element[0].id, name: element[0].name })
    }
    selected = formValues.career;
    let career = [];
    for (let i = 0; i < formValues.career.length; i++) {
      const element = this.careers.filter(c => c.id === selected[i]);
      career.push({ id: element[0].id, name: element[0].name })
    }

    const newStudent = {
      ...formValues,
      statusPay: formValues.numberPay ? 2 : 1,
      dateIncription: today,
      course,
      career,
      courseName: course.map((c:any) => c.name).join(','),
      careerName: career.map((c: any) => c.name).join(','),
    }; 

    console.log('newStudent' , newStudent, this.userForm.invalid);

    if(this.userForm.invalid) {  //no se envia si hay errores 
      this.userForm.markAllAsTouched(); 
    }else if(this.amount == 0) {
      alert('Debe seleccionar al menos un curso o carrera para su inscripción ')
    }else{
      //se envia si los campos estan completos 
      this.userSubmited.emit(newStudent);
      //this.userForm.reset();
    }
    
  }

}
