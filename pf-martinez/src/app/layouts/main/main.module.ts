import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MenuModule
  ],
  exports:[
    MainComponent,
  ]
})
export class MainModule { }
