import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerModel, CourseModel } from '../models/course.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-career',
  templateUrl: './form-career.component.html',
  styleUrl: './form-career.component.scss'
})
export class FormCareerComponent {
  dataForm: FormGroup;
  id?: number = 0; /* para saber si estamos editando */

  constructor(private fb: FormBuilder,
    /* referencia para el crear */
      private dialogRef: MatDialogRef<FormCareerComponent>,
      @Inject(MAT_DIALOG_DATA) private data?: { edit?:CourseModel },
    ){

    this.dataForm = this.fb.group({
      name: this.fb.control('', Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(20)
    ])),
      durations: this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      description: this.fb.control('', Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(200)
    ])),
      price: this.fb.control('',[Validators.required, Validators.pattern(/^[0-9]+$/)]),

    });

    if(this.data?.edit){
      const edit = {
        ...this.data.edit,
        start: this.data.edit.schedule.start,
        career: [ ...this.data.edit.idCareer],
      }

      console.log("Editando", edit)
      this.dataForm.patchValue(edit)
      this.id = this.data.edit.id;
    }

  }

  get name() {
    return this.dataForm.get('name');
  }
  get durations() {
    return this.dataForm.get('durations');
  }
  get description() {
    return this.dataForm.get('description');
  }
  get price() {
    return this.dataForm.get('price');
  }



  onSave(): void {
    const formValues = {
      ...this.dataForm.value,
      typeDuration: "month",
      type: "career",
      id: this.id,
      status: 1
    };
    console.log("Modificamos Formulario Carrera" , formValues);

    if(this.dataForm.invalid) {  //no se envia si hay errores 
      this.dataForm.markAllAsTouched(); 
    }else{
      /* enviamos el formulario al componente de abrio el modal */
      this.dialogRef.close(formValues);
    }
    
  }
}
