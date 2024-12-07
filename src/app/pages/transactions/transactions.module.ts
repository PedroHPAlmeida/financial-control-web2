import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from '../../shared/shared.module';
import { ExtractComponent } from './extract/extract.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';



@NgModule({
  declarations: [
    TransactionsComponent,
    ExtractComponent,
    TransactionDetailsComponent,
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
