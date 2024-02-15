import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersModel } from '../../models/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  userForm: FormGroup;

  /* avisamos al padre el cambio en el formulario */
  @Output()
  userSubmited = new EventEmitter();

  @Input() 
  editUser: UsersModel | null = null;

  id: number = 0;

  constructor(private fb: FormBuilder){
    this.userForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      role: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["editUser"]) {
      this.userForm.patchValue({ ...this.editUser });
      this.id = this.editUser?.id ?? 0;
    }
  }

  onSubmit(): void {
    if(this.userForm.invalid) {
      //no se envia si hay errores 
      this.userForm.markAllAsTouched(); 
    }else{
      //se envia si los campos estan completos 
      this.userSubmited.emit({...this.userForm.value, id: this.id});
      this.userForm.reset();
      this.userForm.markAsUntouched();
    }
    
  }
}
