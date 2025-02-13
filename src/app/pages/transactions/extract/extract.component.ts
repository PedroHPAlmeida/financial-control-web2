import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction, TransactionType } from '../../../core/types/transaction.type';
import { TransactionDetailsComponent } from '../../../shared/components/transaction-details/transaction-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrl: './extract.component.scss'
})
export class ExtractComponent implements OnInit, AfterViewInit {
  transactions: Transaction[] = [];
  columnsToDisplay = ['title', 'category', 'value', 'date'];
  selectedTransactionType?: TransactionType;
  dataSource = new MatTableDataSource<Transaction>(this.transactions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly transactionService: TransactionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getTransactions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = transactions;
      });
  }
}
