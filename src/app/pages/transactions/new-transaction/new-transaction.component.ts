import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../core/services/category.service';
import { TransactionCategory, TransactionCreate, TransactionType } from '../../../core/types/transaction.type';
import { getMonths } from '../../../shared/utils/utils';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent implements OnInit {
  step1FormGroup!: FormGroup;
  step2FormGroup!: FormGroup;
  step3FormGroup!: FormGroup;

  months = getMonths();
  creditCategories: TransactionCategory[] = [];
  expenseCategories: TransactionCategory[] = [];

  private today = new Date();

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChildren(FormGroupDirective) formGroupDirectives!: QueryList<FormGroupDirective>;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.createFormGroups();
    this.getCategories();
  }

  private createFormGroups() {
    this.step1FormGroup = new FormGroup({
      transactionType: new FormControl(null, { validators: [Validators.required], updateOn: 'change' }),
      category: new FormControl(null, { validators: [Validators.required], updateOn: 'blur' })
    });

    this.step2FormGroup = new FormGroup({
      title: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur' }),
      description: new FormControl(''),
      value: new FormControl(null, { validators: [Validators.required, Validators.min(0.01)], updateOn: 'blur' })
    });

    this.step3FormGroup = new FormGroup({
      date: new FormControl(this.today, { validators: [Validators.required], updateOn: 'blur' }),
      currentMonth: new FormControl(this.today.getMonth() + 1, { validators: [Validators.required], updateOn: 'blur' })
    });
  }

  registerTransaction(event: Event) {
    event.preventDefault();

    if (
      this.step1FormGroup.valid &&
      this.step2FormGroup.valid &&
      this.step3FormGroup.valid
    ) {
      const transaction: TransactionCreate = {
        title: this.step2FormGroup.get('title')?.value,
        description: this.step2FormGroup.get('description')?.value || '',
        value: this.step2FormGroup.get('value')?.value || 0,
        type: this.step1FormGroup.get('transactionType')?.value as TransactionType,
        categoryId: this.step1FormGroup.get('category')?.value,
        date: this.step3FormGroup.get('date')?.value || new Date(),
        currentMonth: this.step3FormGroup.get('currentMonth')?.value
      };

      this.transactionService.register(transaction).subscribe(() => {
        this.openSnackBar();
        this.resetForms();
      });
    }
  }

  private resetForms() {
    this.stepper.reset();
    this.formGroupDirectives.forEach(formGroupDirective => formGroupDirective.resetForm());
    this.step3FormGroup.get('date')?.setValue(this.today);
    this.step3FormGroup.get('currentMonth')?.setValue(this.today.getMonth() + 1);
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
