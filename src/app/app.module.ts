import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TransactionsModule } from './pages/transactions/transactions.module';
import { ConsolidatedMonthModule } from './pages/consolidated-month/consolidated-month.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common'
import localePt from '@angular/common/locales/pt';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from "./shared/shared.module";

const LOCALE = 'pt-BR';
registerLocaleData(localePt, LOCALE);
const CURRENCY_CODE = 'BRL';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    TransactionsModule,
    ConsolidatedMonthModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
],
  providers: [
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: LOCALE },
    { provide: DEFAULT_CURRENCY_CODE, useValue: CURRENCY_CODE },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MM/yyyy' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
