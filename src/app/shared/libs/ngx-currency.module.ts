import { NgModule } from "@angular/core";
import { NgxCurrencyDirective } from "ngx-currency";

@NgModule({
    imports: [
        NgxCurrencyDirective,
    ],
    exports: [
        NgxCurrencyDirective,
    ],
})
export class NgxCurrencyModule { }