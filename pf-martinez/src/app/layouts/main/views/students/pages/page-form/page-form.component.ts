import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dataCareers, dataCourse } from '../../../courses/mocks/course.mock';
import { CareerModel, CourseModel } from '../../../courses/models/course.model';
import { StudentModel } from '../../models/studens.model';

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
  id?: number = 0; /* para saber si estamos editando */

  /* avisamos al padre el cambio en el formulario */
  @Output()
  userSubmited = new EventEmitter();

  /* Para el editar */
  @Input()
  studentDataEdit?: StudentModel;

  courses: CourseModel[] = dataCourse;
  careers: CareerModel[] = dataCareers;

  constructor(private fb: FormBuilder){
    this.userForm = this.fb.group({
      firstName: this.fb.control('', Validators.compose([
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(20)
    ])),
      lastName: this.fb.control('', Validators.compose([
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(20)
    ])),
      email: this.fb.control('', Validators.compose([
        Validators.required, 
        Validators.email
    ])),
      course: this.fb.control([]),
      career: this.fb.control([]),
      numberPay: this.fb.control(''),
    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }

  ngOnInit(): void {
    this.userForm.get('career')?.valueChanges.subscribe((selected) => {
      this.totalPay(selected, 1);
    });
    this.userForm.get('course')?.valueChanges.subscribe((selected) => {
      this.totalPay(selected, 2);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["studentDataEdit"]) {
      this.userForm.patchValue({
        firstName: this.studentDataEdit?.firstName,
        lastName: this.studentDataEdit?.lastName,
        email:  this.studentDataEdit?.email,
        course:  this.studentDataEdit && this.studentDataEdit?.course.length > 0 
                          ? this.studentDataEdit?.course.map(c=>c.id) 
                          : [],
        career:  this.studentDataEdit && this.studentDataEdit?.career.length > 0 
                              ? this.studentDataEdit?.career.map(c=>c.id) 
                              : [],
        numberPay:  this.studentDataEdit?.numberPay,
      });
      this.id = this.studentDataEdit?.id;
      console.log("Modificamos Formulario", this.userForm.value);
    }
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
      id: this.id ? this.id : 0,
      statusPay: formValues.numberPay ? 2 : 1,
      dateIncription: today,
      course,
      career,
      courseName: course.map((c:any) => c.name).join(','),
      careerName: career.map((c: any) => c.name).join(','),
    }; 

    if(this.userForm.invalid) {  //no se envia si hay errores 
      this.userForm.markAllAsTouched(); 
    }else if(this.amount == 0) {
      alert('Debe seleccionar al menos un curso o carrera para su inscripción ')
    }else{
      console.log('newStudent', newStudent);
      this.userSubmited.emit(newStudent);
    }
    
  }

}
