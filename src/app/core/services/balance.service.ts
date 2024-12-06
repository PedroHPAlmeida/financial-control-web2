import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Balance } from '../types/balance.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private readonly httpClient: HttpClient) { }

  checkBalance(month?: number, year?: number): Observable<Balance> {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }

    return this.httpClient.get<Balance>('/api/v1/balance', { params });
  }

  checkBalancePlusRemainingPayments(month?: number, year?: number): Observable<Balance> {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }
    return this.httpClient.get<Balance>('/api/v1/balance/plus-remaining-payments', { params });
  }
}
