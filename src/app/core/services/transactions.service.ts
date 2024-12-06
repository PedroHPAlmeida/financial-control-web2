import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../types/transaction.type';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private readonly httpClient: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>('/api/v1/transactions');
  }
}
