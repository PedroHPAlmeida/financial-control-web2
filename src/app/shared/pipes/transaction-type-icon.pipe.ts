import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../../core/types/transaction.type';

@Pipe({
  name: 'transactionTypeIcon'
})
export class TransactionTypeIconPipe implements PipeTransform {
  transform(value: TransactionType): string {
    return value === 'CREDIT' ? 'assets/icons/up-green-arrow.svg' : 'assets/icons/down-red-arrow.svg';
  }
}
