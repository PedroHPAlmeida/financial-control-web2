import { Component, OnInit } from '@angular/core';
import { getMonths } from '../../shared/utils/utils';
import { FormControl } from '@angular/forms';
import { Transaction } from '../../core/types/transaction.type';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-consolidated-month',
  templateUrl: './consolidated-month.component.html',
  styleUrl: './consolidated-month.component.scss'
})
export class ConsolidatedMonthComponent implements OnInit {
  currentMonth = new FormControl(new Date().getMonth() + 1);
  months = getMonths();
  expenses: Transaction[] = [];
  columnsToDisplay = ['title', 'value'];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.getTransactions();
    this.onCurrentMonthChange();
  }

  onCurrentMonthChange() {
    this.currentMonth.valueChanges.subscribe(() => {
      this.getTransactions();
    });
  }

  private getTransactions() {
    if (!this.currentMonth.value) return;

    console.log(this.currentMonth.value);
    this.transactionService.getAll(this.currentMonth.value, undefined, 'EXPENSE')
      .subscribe(transactions => {
        this.expenses = transactions;
      });
  }
}
