import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private readonly httpClient: HttpClient) { }

  checkBalance(month?: number, year?: number): any {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }

    return this.httpClient.get('/api/v1/balance', { params });
  }

  checkBalancePlusRemainingPayments(month?: number, year?: number): any {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }
    return this.httpClient.get('/api/v1/balance/plus-remaining-payments', { params });
  }
}
