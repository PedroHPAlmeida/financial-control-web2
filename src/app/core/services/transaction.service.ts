import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../types/transaction.type';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private readonly httpClient: HttpClient) { }

  getAll(month?: number, year?: number): Observable<Transaction[]> {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }
    return this.httpClient.get<Transaction[]>('/api/v1/transactions', { params });
  }

  register(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>('/api/v1/transactions', transaction);
  }
}
