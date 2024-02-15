import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';


@NgModule({
  declarations: [
    InscriptionsComponent
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    AsyncPipe,
    SharedModule,
    InscriptionsRoutingModule
  ]
})
export class InscriptionsModule { }
