import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { Month, TransactionCategory, TransactionCreate, TransactionType } from '../../../core/types/transaction.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../core/services/category.service';
import { getMonths } from '../../../shared/utils/utils';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent implements OnInit {
  title = new FormControl(
    { value: '', disabled: false },
    { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }
  );
  description = new FormControl('');
  value = new FormControl(
    { value: null, disabled: false },
    { validators: [Validators.required, Validators.min(0.01)], updateOn: 'blur' }
  );
  transactionType = new FormControl(
    { value: null, disabled: false },
    { validators: [Validators.required], updateOn: 'change' }
  );
  category = new FormControl(
    { value: null, disabled: false },
    { validators: [Validators.required], updateOn: 'blur' }
  );
  date = new FormControl(
    { value: new Date(), disabled: false },
    { validators: [Validators.required], updateOn: 'blur' }
  );
  currentMonth = new FormControl(
    { value: new Date().getMonth() + 1, disabled: false },
    { validators: [Validators.required], updateOn: 'blur' }
  );
  months = getMonths();
  creditCategories: TransactionCategory[] = [];
  expenseCategories: TransactionCategory[] = [];

  constructor(private readonly snackBar: MatSnackBar, private readonly transactionService: TransactionService, private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  registerTransaction(event: Event) {
    event.preventDefault();

    const transaction: TransactionCreate = {
      title: this.title.value!,
      description: this.description.value || '',
      value: this.value.value || 0,
      type: this.transactionType.value! as TransactionType,
      categoryId: this.category.value!,
      date: this.date.value || new Date(),
      currentMonth: this.currentMonth.value!,
    }
    this.transactionService.register(transaction).subscribe((_) => {
      this.openSnackBar();
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.creditCategories = categories.filter(category => category.type === 'CREDIT');
      this.expenseCategories = categories.filter(category => category.type === 'EXPENSE');
    });
  }

  private openSnackBar() {
    this.snackBar.open('Transação registrada com sucesso!', undefined, {
      duration: 3000,
      verticalPosition: 'top',
    });
  }
}
