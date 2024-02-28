import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { DasboardEffects } from './store/dasboard.effects';
import { StoreModule } from '@ngrx/store';
import { dasboardFeature } from './store/dasboard.reducer';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    /* importamos el reducer */
    StoreModule.forFeature(dasboardFeature),

    /* se crea automaico con la instalación de los efectos */
    EffectsModule.forFeature([DasboardEffects]),    
    
  ]
})
export class HomeModule { }
