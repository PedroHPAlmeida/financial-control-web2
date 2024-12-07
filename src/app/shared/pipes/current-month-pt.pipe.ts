import { Pipe, PipeTransform } from '@angular/core';
import { Month } from '../../core/types/transaction.type';

@Pipe({
  name: 'currentMonthPt'
})
export class CurrentMonthPtPipe implements PipeTransform {
  transform(value: Month): string {
    const monthsPt = {
      'JANUARY': 'janeiro',
      'FEBRUARY': 'fevereiro',
      'MARCH': 'março',
      'APRIL': 'abril',
      'MAY': 'maio',
      'JUNE': 'junho',
      'JULY': 'julho',
      'AUGUST': 'agosto',
      'SEPTEMBER': 'setembro',
      'OCTOBER': 'outubro',
      'NOVEMBER': 'novembro',
      'DECEMBER': 'dezembro',
    }
    return monthsPt[value];
  }
}
