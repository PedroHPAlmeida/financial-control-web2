import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Balance } from '../types/balance.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  basePath = '/api/v1/balance';

  constructor(private readonly httpClient: HttpClient) { }

  checkBalance(month?: number, year?: number): Observable<Balance> {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }

    return this.httpClient.get<Balance>(this.basePath, { params });
  }

  checkBalancePlusRemainingPayments(month?: number, year?: number): Observable<Balance> {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }
    return this.httpClient.get<Balance>(`${this.basePath}/plus-remaining-payments`, { params });
  }
}
