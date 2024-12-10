import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from '../../shared/shared.module';
import { ExtractComponent } from './extract/extract.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TransactionsComponent,
    ExtractComponent,
    TransactionDetailsComponent,
    NewTransactionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    TransactionsComponent
  ]
})
export class TransactionsModule { }
