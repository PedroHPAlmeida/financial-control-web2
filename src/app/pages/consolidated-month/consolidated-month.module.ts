import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsolidatedMonthComponent } from './consolidated-month.component';
import { AngularMaterialModule } from '../../shared/libs/angular-material.module';



@NgModule({
  declarations: [
    ConsolidatedMonthComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    ConsolidatedMonthComponent,
  ]
})
export class ConsolidatedMonthModule { }
