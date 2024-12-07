import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from '../../shared/shared.module';
import { ExtractComponent } from './extract/extract.component';



@NgModule({
  declarations: [
    TransactionsComponent,
    ExtractComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    TransactionsComponent
  ]
})
export class TransactionsModule { }
