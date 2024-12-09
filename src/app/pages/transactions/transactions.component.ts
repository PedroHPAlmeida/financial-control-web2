import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  constructor(public dialog: MatDialog) { }

  openNewTransactionDialog() {
    this.dialog.open(NewTransactionComponent);
  }
}
