import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsolidatedTransactions, Transaction, TransactionCreate, TransactionType, TransactionTotals } from '../types/transaction.type';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  basePath = '/api/v1/transactions';

  constructor(private readonly httpClient: HttpClient) { }

  getAll(month?: number, year?: number, type?: TransactionType): Observable<Transaction[]> {
    let params = {};
    if (month) {
      params = { ...params, month };
    }
    if (year) {
      params = { ...params, year };
    }
    if (type) {
      params = { ...params, type };
    }
    return this.httpClient.get<Transaction[]>(this.basePath, { params });
  }

  register(transaction: TransactionCreate): Observable<Transaction> {
    return this.httpClient.post<Transaction>(this.basePath, {...transaction, date: transaction.date.toISOString()});
  }

  getTotals(month: number, year: number): Observable<TransactionTotals> {
    const params = { month, year };
    return this.httpClient.get<TransactionTotals>(`${this.basePath}/totals`, { params });
  }

  consolidateMonth(type: TransactionType, month: number, year: number): Observable<ConsolidatedTransactions[]> {
    const params = { type, month, year };
    return this.httpClient.get<ConsolidatedTransactions[]>(`${this.basePath}/consolidated`, { params });
  }
}
