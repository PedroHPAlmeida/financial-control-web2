import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ExtractComponent } from './extract/extract.component';



@NgModule({
  declarations: [
    HomeComponent,
    ExtractComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
