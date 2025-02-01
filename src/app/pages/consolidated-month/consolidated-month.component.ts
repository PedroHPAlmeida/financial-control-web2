import { Component, OnInit } from '@angular/core';
import { getMonths } from '../../shared/utils/utils';
import { FormControl } from '@angular/forms';
import { Transaction } from '../../core/types/transaction.type';
import { TransactionService } from '../../core/services/transaction.service';
import { TransactionDetailsComponent } from '../../shared/components/transaction-details/transaction-details.component';
import { MatDialog } from '@angular/material/dialog';
import { BalanceService } from '../../core/services/balance.service';
import { Balance } from '../../core/types/balance.type';

@Component({
  selector: 'app-consolidated-month',
  templateUrl: './consolidated-month.component.html',
  styleUrl: './consolidated-month.component.scss'
})
export class ConsolidatedMonthComponent implements OnInit {
  currentMonth = new FormControl(new Date().getMonth() + 1);
  months = getMonths();
  expenses: Transaction[] = [];
  balance: number = 0;
  balancePlusRemainingPayments: number = 0;
  columnsToDisplay = ['title', 'value'];

  constructor(
    private transactionService: TransactionService,
    private balanceService: BalanceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getTransactions();
    this.onCurrentMonthChange();
  }

  onCurrentMonthChange() {
    this.currentMonth.valueChanges.subscribe(() => {
      this.getTransactions();
      this.getBalances();
    });
  }

  openExpenseDetails(transaction: Transaction) {
    this.dialog.open(TransactionDetailsComponent, { data: transaction })
  }

  private getTransactions() {
    if (!this.currentMonth.value) return;

    this.transactionService.getAll(this.currentMonth.value, undefined, 'EXPENSE')
      .subscribe(transactions => {
        this.expenses = transactions;
      });
  }

  private getBalances() {
    if (!this.currentMonth.value) return;

    this.balanceService.checkBalance(this.currentMonth.value)
      .subscribe(response => {
        this.balance = response.balance;
      });

    this.balanceService.checkBalancePlusRemainingPayments(this.currentMonth.value)
      .subscribe(response => {
        this.balancePlusRemainingPayments = response.balance;
      });
  }
}
