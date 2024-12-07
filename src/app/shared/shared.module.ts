import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './libs/angular-material.module';
import { CurrentMonthPtPipe } from './pipes/current-month-pt.pipe';
import { TransactionTypeIconPipe } from './pipes/transaction-type-icon.pipe';


@NgModule({
    declarations: [
        CurrentMonthPtPipe,
        TransactionTypeIconPipe,
    ],
    imports: [
        BrowserModule,
        AngularMaterialModule,
    ],
    exports: [
        AngularMaterialModule,
        CurrentMonthPtPipe,
        TransactionTypeIconPipe,
    ],
})
export class SharedModule { }
