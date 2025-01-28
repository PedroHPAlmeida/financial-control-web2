import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction, TransactionType } from '../../../core/types/transaction.type';
import { TransactionDetailsComponent } from '../../../shared/components/transaction-details/transaction-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrl: './extract.component.scss'
})
export class ExtractComponent implements OnInit {
  transactions: Transaction[] = [];
  columnsToDisplay = ['title', 'description', 'value', 'date'];
  selectedTransactionType?: TransactionType;

  constructor(
    private readonly transactionService: TransactionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getTransactions();
  }

  onTabChange(index: number) {
    switch (index) {
      case 0:
        this.selectedTransactionType = undefined;
        break;
      case 1:
        this.selectedTransactionType = 'CREDIT';
        break;
      case 2:
        this.selectedTransactionType = 'EXPENSE';
        break;
    }
    this.getTransactions();
  }

  openTransactionDetails(transaction: Transaction) {
    this.dialog.open(TransactionDetailsComponent, { data: transaction })
  }

  private getTransactions() {
    this.transactionService.getAll(undefined, undefined, this.selectedTransactionType)
      .subscribe(transactions => {
        this.transactions = transactions;
      });
  }
}
