import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatTableModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        MatTableModule,
        MatDialogModule,
        MatButtonModule
    ],
})
export class AngularMaterialModule { }