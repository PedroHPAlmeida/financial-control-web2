import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { CustomPaginator } from "./custom/custom-paginator";
import { MatDividerModule } from "@angular/material/divider";
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
    imports: [
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTabsModule,
        MatSortModule,
        MatPaginatorModule,
        MatDividerModule,
        MatStepperModule,
    ],
    exports: [
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTabsModule,
        MatSortModule,
        MatPaginatorModule,
        MatDividerModule,
        MatStepperModule,
    ],
    providers: [
        provideNativeDateAdapter(),
        { provide: MatPaginatorIntl, useClass: CustomPaginator }
    ]
})
export class AngularMaterialModule { }