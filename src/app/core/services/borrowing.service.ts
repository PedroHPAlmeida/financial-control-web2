import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Borrowing, BorrowingCreate, ParcelCreate } from '../types/borrowing.type';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {
  basePath = '/api/v1/borrowings';

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<Borrowing[]> {
    return this.httpClient.get<Borrowing[]>(this.basePath);
  }

  register(borrowing: BorrowingCreate): Observable<Borrowing> {
    return this.httpClient.post<Borrowing>(this.basePath, borrowing);
  }

  payParcel(borrowingId: number, parcel: ParcelCreate) {
    return this.httpClient.post(`${this.basePath}/${borrowingId}/parcels`, parcel);
  }
}
