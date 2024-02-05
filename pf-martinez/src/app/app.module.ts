import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoginModule } from './layouts/auth/login/login.module';
import { RouterModule } from '@angular/router';
import { ErrorsModule } from './layouts/errors/errors.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
/*     MainModule, */
    LoginModule,
    RouterModule,
    ErrorsModule,
  ],
  /* indicamos el idioma para el Pipe de Date */
  providers: [
  { 
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: {
      appearance: 'outline',
    },
  },
  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
