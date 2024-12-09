import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../core/types/transaction.type';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrl: './extract.component.scss'
})
export class ExtractComponent implements OnInit {
  transactions: Transaction[] = [];
  columnsToDisplay = ['title', 'description', 'value', 'date'];

  constructor(
    private readonly transactionService: TransactionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getAll().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  openTransactionDetails(transaction: Transaction) {
    this.dialog.open(TransactionDetailsComponent, { data: transaction })
  }
}
