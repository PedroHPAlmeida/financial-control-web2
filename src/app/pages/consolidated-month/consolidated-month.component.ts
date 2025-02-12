import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { getMonths } from '../../shared/utils/utils';
import { ConsolidatedTransactions, TransactionTotals } from '../../core/types/transaction.type';
import { TransactionService } from '../../core/services/transaction.service';
import { BalanceService } from '../../core/services/balance.service';
import { ConsolidatedTransactionDetailsComponent } from '../../shared/components/consolidated-transaction-details/consolidated-transaction-details.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consolidated-month',
  templateUrl: './consolidated-month.component.html',
  styleUrls: ['./consolidated-month.component.scss']
})
export class ConsolidatedMonthComponent implements OnInit, AfterViewInit {
  currentMonth = new FormControl(new Date().getMonth() + 1);
  currentYear = new Date().getFullYear();
  months = getMonths();
  totals: TransactionTotals = { credits: 0, expenses: 0 };
  balance: number = 0;
  balancePlusRemainingPayments: number = 0;
  columnsToDisplay = ['title', 'value'];
  dataSource = new MatTableDataSource<ConsolidatedTransactions>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: ConsolidatedTransactions, property: string) => {
      switch (property) {
        case 'title':
          return item.title;
        case 'value':
          return item.total;
        default:
          return (item as any)[property];
      }
    };

    this.sort.sort({ id: 'value', start: 'desc', disableClear: false });
  }

  onCurrentMonthChange() {
    this.currentMonth.valueChanges.subscribe(() => {
      this.getTotals();
      this.getConsolidatedTransactions();
      this.getBalances();
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
        this.dataSource.data = expenses;
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
