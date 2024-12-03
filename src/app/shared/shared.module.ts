import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './libs/angular-material.module';


@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        AngularMaterialModule,
    ],
    exports: [
        AngularMaterialModule,
    ],
})
export class SharedModule { }
