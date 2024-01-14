import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { StudentsModule } from './views/students/students.module';
import { MatListModule } from '@angular/material/list';
import { ListMaterialModule } from '../../components/list-material/list-material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ListMaterialModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    StudentsModule
  ],
  exports:[
    MainComponent,
  ]
})
export class MainModule { }
