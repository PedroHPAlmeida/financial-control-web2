import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransactionCategory } from "../types/transaction.type";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    basePath = '/api/v1/transactions/categories';

    constructor(private readonly httpClient: HttpClient) { }

    getAll(): Observable<TransactionCategory[]> {
        return this.httpClient.get<TransactionCategory[]>(this.basePath);
    }
}