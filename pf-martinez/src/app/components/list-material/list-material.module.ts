import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatListModule} from '@angular/material/list';
import { ListMaterialComponent } from './list-material.component';
import {MatIconModule} from '@angular/material/icon'; 

@NgModule({
  declarations: [ListMaterialComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [ListMaterialComponent]
})
export class ListMaterialModule { }
