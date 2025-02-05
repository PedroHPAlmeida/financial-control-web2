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
    ],
    providers: [
        provideNativeDateAdapter(),
    ]
})
export class AngularMaterialModule { }