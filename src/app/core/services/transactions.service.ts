import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private readonly httpClient: HttpClient) { }

  getTransactions(): Observable<any[]> {
    return this.httpClient.get<any[]>('/api/v1/transactions');
  }
}
