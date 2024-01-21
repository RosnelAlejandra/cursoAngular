import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './layouts/main/main.module';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es-CL'

registerLocaleData(es);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule
  ],
  /* indicamos el idioma para el Pipe de Date */
  providers: [{
    provide: LOCALE_ID, 
    useValue: 'es-cl'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
