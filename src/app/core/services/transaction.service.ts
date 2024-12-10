import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction, TransactionCreate } from '../types/transaction.type';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  basePath = '/api/v1/transactions';

  constructor(private readonly httpClient: HttpClient) { }

  getAll(month?: number, year?: number): Observable<Transaction[]> {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }
    return this.httpClient.get<Transaction[]>(this.basePath, { params });
  }

  register(transaction: TransactionCreate): Observable<Transaction> {
    return this.httpClient.post<Transaction>(this.basePath, {...transaction, date: transaction.date.toISOString()});
  }
}
