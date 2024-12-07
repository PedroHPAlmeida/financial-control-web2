import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './libs/angular-material.module';
import { CurrentMonthPtPipe } from './pipes/current-month-pt.pipe';


@NgModule({
    declarations: [
        CurrentMonthPtPipe,
    ],
    imports: [
        BrowserModule,
        AngularMaterialModule,
    ],
    exports: [
        AngularMaterialModule,
        CurrentMonthPtPipe,
    ],
})
export class SharedModule { }
