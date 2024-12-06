import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Transaction } from '../../../core/types/transaction.type';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrl: './extract.component.scss'
})
export class ExtractComponent implements OnInit {
  transactions: Transaction[] = [];
  columnsToDisplay = ['id', 'title', 'description', 'value', 'type', 'currentMonth', 'date', 'time'];

  constructor(private readonly transactionsService: TransactionsService) { }

  ngOnInit() {
    console.log('ExtractComponent');
    this.getTransactions();
  }

  getTransactions() {
    this.transactionsService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      console.log(this.transactions);
    });
  }
}
