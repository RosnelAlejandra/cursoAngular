import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CareerModel, CourseModel, ModalityModel } from '../models/course.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrl: './form-course.component.scss'
})
export class FormCourseComponent {
  dataForm: FormGroup;
  id?: number = 0; /* para saber si estamos editando */
  careersData: CareerModel[] = [];
  modalitiesData: ModalityModel[] = [];

  constructor(private fb: FormBuilder,
    /* referencia para el crear */
      private dialogRef: MatDialogRef<FormCourseComponent>,
      @Inject(MAT_DIALOG_DATA) private data?: { edit?:CourseModel, careers:CareerModel[], modalities: ModalityModel[]  },
    ){

    this.careersData = data?.careers ?? [];
    this.modalitiesData = data?.modalities ?? [];

    this.dataForm = this.fb.group({
      name: this.fb.control('', Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(20)
    ])),
      durations: this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      description: this.fb.control('', Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(200)
    ])),
      price: this.fb.control('',[Validators.required, Validators.pattern(/^[0-9]+$/)]),
      modality: this.fb.control([[]],Validators.required),
      career: this.fb.control([],Validators.required),
      start: this.fb.control('',Validators.required),
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

  dateToEnd(): Date {
    const nowDate = new Date();
    const selectedDate = this.dataForm.get('start')?.value;
    const durations = Number(this.dataForm.get('durations')?.value);

    // Verifica si la fecha seleccionada es válida y posterior a la fecha actual
    if (selectedDate && selectedDate > nowDate) {
      const nuevaFecha = new Date(selectedDate);
      nuevaFecha.setDate(nuevaFecha.getDate() + (7*durations)); // Suma 3 semanas (7 días/semana * 3 semanas)
      return nuevaFecha;
    }
    return nowDate;
  }

  onSave(): void {

    const end = this.dateToEnd();

    if(end == new Date()){
      alert("error en fecha")
    }

    const formValues = {
      ...this.dataForm.value,
      typeDuration: "weeks",
      type: "course",
      id: this.id,
      modality: this.dataForm.value.modality[0],
      schedule: {
        start: this.dataForm.value.start,
        end
      },
      status: 1
    };
    console.log("Modificamos Formulario", formValues);

    if(this.dataForm.invalid) {  //no se envia si hay errores 
      this.dataForm.markAllAsTouched(); 
    }else{
      /* enviamos el formulario al componente de abrio el modal */
      this.dialogRef.close(formValues);
    }
    
  }
}
