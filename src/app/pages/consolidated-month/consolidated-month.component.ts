import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { getMonths } from '../../shared/utils/utils';
import { ConsolidatedTransactions, Transaction, TransactionTotals } from '../../core/types/transaction.type';
import { TransactionService } from '../../core/services/transaction.service';
import { BalanceService } from '../../core/services/balance.service';
import { ConsolidatedTransactionDetailsComponent } from '../../shared/components/consolidated-transaction-details/consolidated-transaction-details.component';

@Component({
  selector: 'app-consolidated-month',
  templateUrl: './consolidated-month.component.html',
  styleUrl: './consolidated-month.component.scss'
})
export class ConsolidatedMonthComponent implements OnInit, AfterViewInit {
  currentMonth = new FormControl(new Date().getMonth() + 1);
  currentYear = new Date().getFullYear();
  months = getMonths();
  consolidatedTransactions: ConsolidatedTransactions[] = [];
  totals: TransactionTotals = { 'credits': 0, 'expenses': 0 };
  balance: number = 0;
  balancePlusRemainingPayments: number = 0;
  columnsToDisplay = ['title', 'value'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private transactionService: TransactionService,
    private balanceService: BalanceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getConsolidatedTransactions();
    this.onCurrentMonthChange();
    this.getTotals();
    this.getBalances();
  }

  ngAfterViewInit() {
    const defaultSortState: Sort = { active: 'value', direction: 'desc' };
    this.sort.active = defaultSortState.active;
    this.sort.direction = defaultSortState.direction;
    this.onSortChange(defaultSortState);
  }

  onCurrentMonthChange() {
    this.currentMonth.valueChanges.subscribe(() => {
      this.getTotals();
      this.getConsolidatedTransactions();
      this.getBalances();
    });
  }

  onSortChange(sortState: Sort): void {
    const data = this.consolidatedTransactions.slice();

    if (!sortState.active || sortState.direction === '') {
      this.consolidatedTransactions = data;
      return;
    }

    this.consolidatedTransactions = data.sort((a, b) => {
      let comparatorResult = 0;

      switch (sortState.active) {
        case 'title':
          comparatorResult = a.title.localeCompare(b.title);
          break;
        case 'value':
          comparatorResult = a.total - b.total;
          break;
        default:
          break;
      }

      return sortState.direction === 'asc' ? comparatorResult : -comparatorResult;
    });
  }

  openExpenseDetails(consolidated: ConsolidatedTransactions) {
    this.dialog.open(ConsolidatedTransactionDetailsComponent, { data: consolidated });
  }

  private getTotals() {
    if (!this.currentMonth.value) return;

    this.transactionService.getTotals(this.currentMonth.value, this.currentYear)
      .subscribe(totals => {
        this.totals = totals;
      });
  }

  private getConsolidatedTransactions() {
    if (!this.currentMonth.value) return;

    this.transactionService.consolidateMonth('EXPENSE', this.currentMonth.value, this.currentYear)
      .subscribe(expenses => {
        this.consolidatedTransactions = expenses;
        this.onSortChange({ active: 'value', direction: 'desc' });
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
