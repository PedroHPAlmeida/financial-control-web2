import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../core/services/category.service';
import { TransactionCategory, TransactionCreate, TransactionType } from '../../../core/types/transaction.type';
import { getMonths } from '../../../shared/utils/utils';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  private today = new Date();
  months = getMonths();
  creditCategories: TransactionCategory[] = [];
  expenseCategories: TransactionCategory[] = [];

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
  }

  registerTransaction(event: Event) {
    event.preventDefault();

    const transaction: TransactionCreate = {
      title: this.transactionForm.get('title')?.value,
      description: this.transactionForm.get('description')?.value || '',
      value: this.transactionForm.get('value')?.value || 0,
      type: this.transactionForm.get('transactionType')?.value as TransactionType,
      categoryId: this.transactionForm.get('category')?.value,
      date: this.transactionForm.get('date')?.value || new Date(),
      currentMonth: this.transactionForm.get('currentMonth')?.value
    };

    this.transactionService.register(transaction).subscribe(() => {
      this.openSnackBar();
      this.formGroupDirective.resetForm({
        date: this.today,
        currentMonth: this.today.getMonth() + 1
      });
    });
  }

  private createForm(): void {
    this.transactionForm = new FormGroup({
      title: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }),
      description: new FormControl(''),
      value: new FormControl(null, { validators: [Validators.required, Validators.min(0.01)], updateOn: 'blur' }),
      transactionType: new FormControl(null, { validators: [Validators.required], updateOn: 'change' }),
      category: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' }),
      date: new FormControl(this.today, { validators: [Validators.required], updateOn: 'blur' }),
      currentMonth: new FormControl(this.today.getMonth() + 1, { validators: [Validators.required], updateOn: 'blur' })
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
