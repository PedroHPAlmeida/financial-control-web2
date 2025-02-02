import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsolidatedTransactions } from '../../../core/types/transaction.type';

@Component({
  selector: 'app-consolidated-transaction-details',
  templateUrl: './consolidated-transaction-details.component.html',
  styleUrl: './consolidated-transaction-details.component.scss'
})
export class ConsolidatedTransactionDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public consolidated: ConsolidatedTransactions) { }
}
