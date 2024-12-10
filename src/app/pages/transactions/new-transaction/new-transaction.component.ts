import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent {
  title = new FormControl();
  description = new FormControl('');
  value = new FormControl(0);
  transactionType = new FormControl();
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

  saveTransaction(event: Event) {
    event.preventDefault();
    console.log(this.title.value);
    console.log(this.description.value);
    console.log(this.value.value);
    console.log(this.transactionType.value);
    console.log(this.date.value);
    console.log(this.currentMonth.value);
  }
}
