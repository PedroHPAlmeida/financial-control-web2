import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionCategory, TransactionCreate } from '../../../core/types/transaction.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent implements OnInit {
  title = new FormControl();
  description = new FormControl('');
  value = new FormControl(0);
  transactionType = new FormControl();
  category = new FormControl();
  date = new FormControl(new Date());
  currentMonth = new FormControl();
  months = [
    { name: 'Janeiro', value: 1 },
    { name: 'Fevereiro', value: 2 },
    { name: 'Março', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Maio', value: 5 },
    { name: 'Junho', value: 6 },
    { name: 'Julho', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Setembro', value: 9 },
    { name: 'Outubro', value: 10 },
    { name: 'Novembro', value: 11 },
    { name: 'Dezembro', value: 12 },
  ];
  categories: TransactionCategory[] = [];

  constructor(private readonly snackBar: MatSnackBar, private readonly transactionService: TransactionService, private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  registerTransaction(event: Event) {
    event.preventDefault();

    const transaction: TransactionCreate = {
      title: this.title.value,
      description: this.description.value || '',
      value: this.value.value || 0,
      type: this.transactionType.value,
      categoryId: this.category.value ? this.category.value.id : undefined,
      date: this.date.value || new Date(),
      currentMonth: this.currentMonth.value
    }
    this.transactionService.register(transaction).subscribe((_) => {
      this.openSnackBar();
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  private openSnackBar() {
    this.snackBar.open('Transação registrada com sucesso!', undefined, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
