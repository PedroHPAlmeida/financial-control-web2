import { Pipe, PipeTransform } from '@angular/core';
import { TransactionCategory } from '../../core/types/transaction.type';

@Pipe({
    name: 'transactionCategoryIcon'
})
export class TransactionCategoryIconPipe implements PipeTransform {
    transform(category: TransactionCategory): string {
        if (category.type == 'CREDIT') {
            return 'assets/icons/credit.svg';
        }

        switch (category.name.toLowerCase()) {
            case 'alimentação':
                return 'assets/icons/food.svg';
            case 'doações e caridade':
                return 'assets/icons/donation.svg';
            case 'educação':
                return 'assets/icons/education.svg';
            case 'impostos e taxas':
                return 'assets/icons/taxes.svg';
            case 'investimentos':
                return 'assets/icons/investiment.svg';
            case 'lazer':
                return 'assets/icons/entertainment.svg';
            case 'moradia':
                return 'assets/icons/house.svg';
            case 'saúde':
                return 'assets/icons/healthy.svg';
            case 'seguros':
                return 'assets/icons/insurance.svg';
            case 'transporte':
                return 'assets/icons/transport.svg';
            case 'vestuário':
                return 'assets/icons/clothe.svg';
            default:
                return 'assets/icons/other.svg';
        }
    }
}
