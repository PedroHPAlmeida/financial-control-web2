import { Routes } from '@angular/router';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ConsolidatedMonthComponent } from './pages/consolidated-month/consolidated-month.component';

export const routes: Routes = [
    { path: '', component: TransactionsComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'consolidated', component: ConsolidatedMonthComponent },
    { path: '**', redirectTo: '' }
];
