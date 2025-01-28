import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsolidatedMonthComponent } from './consolidated-month.component';
import { AngularMaterialModule } from '../../shared/libs/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ConsolidatedMonthComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    ConsolidatedMonthComponent,
  ]
})
export class ConsolidatedMonthModule { }
