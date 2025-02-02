import { Component, OnInit } from '@angular/core';
import { getMonths } from '../../shared/utils/utils';
import { FormControl } from '@angular/forms';
import { ConsolidatedTransactions, Transaction } from '../../core/types/transaction.type';
import { TransactionService } from '../../core/services/transaction.service';
import { TransactionDetailsComponent } from '../../shared/components/transaction-details/transaction-details.component';
import { MatDialog } from '@angular/material/dialog';
import { BalanceService } from '../../core/services/balance.service';
import { ConsolidatedTransactionDetailsComponent } from '../../shared/components/consolidated-transaction-details/consolidated-transaction-details.component';

@Component({
  selector: 'app-consolidated-month',
  templateUrl: './consolidated-month.component.html',
  styleUrl: './consolidated-month.component.scss'
})
export class ConsolidatedMonthComponent implements OnInit {
  currentMonth = new FormControl(new Date().getMonth() + 1);
  months = getMonths();
  consolidatedTransactions: ConsolidatedTransactions[] = [];
  balance: number = 0;
  balancePlusRemainingPayments: number = 0;
  columnsToDisplay = ['title', 'value'];

  constructor(
    private transactionService: TransactionService,
    private balanceService: BalanceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getConsolidatedTransactions();
    this.onCurrentMonthChange();
  }

  onCurrentMonthChange() {
    this.currentMonth.valueChanges.subscribe(() => {
      this.getConsolidatedTransactions();
      this.getBalances();
    });
  }

  openExpenseDetails(consolidated: ConsolidatedTransactions) {
    this.dialog.open(ConsolidatedTransactionDetailsComponent, { data: consolidated })
  }

  private getConsolidatedTransactions() {
    if (!this.currentMonth.value) return;

    this.transactionService.consolidateMonth('EXPENSE', this.currentMonth.value, new Date().getFullYear())
      .subscribe(expenses => {
        this.consolidatedTransactions = expenses;
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
