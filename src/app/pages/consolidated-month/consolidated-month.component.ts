import { Component, OnInit } from '@angular/core';
import { getMonths } from '../../shared/utils/utils';
import { FormControl } from '@angular/forms';
import { Transaction } from '../../core/types/transaction.type';
import { TransactionService } from '../../core/services/transaction.service';
import { TransactionDetailsComponent } from '../../shared/components/transaction-details/transaction-details.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getTransactions();
    this.onCurrentMonthChange();
  }

  onCurrentMonthChange() {
    this.currentMonth.valueChanges.subscribe(() => {
      this.getTransactions();
    });
  }

  openExpenseDetails(transaction: Transaction) {
    this.dialog.open(TransactionDetailsComponent, { data: transaction })
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
