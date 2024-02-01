import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  userForm: FormGroup;

  /* avisamos al padre el cambio en el formulario */
  @Output()
  userSubmited = new EventEmitter();

  constructor(private fb: FormBuilder){
    this.userForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
    });
  }

  onSubmit(): void {
    if(this.userForm.invalid) {
      //no se envia si hay errores 
      this.userForm.markAllAsTouched(); 
    }else{
      //se envia si los campos estan completos 
      this.userSubmited.emit(this.userForm.value);
      this.userForm.reset();
    }
    
  }

}
