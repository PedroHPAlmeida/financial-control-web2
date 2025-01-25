import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransactionCategory } from "../types/transaction.type";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    basePath = '/api/v1/categories';

    constructor(private readonly httpClient: HttpClient) { }

    getAll(): Observable<TransactionCategory[]> {
        // return this.httpClient.get<TransactionCategory[]>(this.basePath);
        return new Observable(subscriber => {
            subscriber.next([
                {
                    id: '1',
                    name: 'Alimentação',
                    description: 'Categoria para despesas com alimentação'
                },
                {
                    id: '2',
                    name: 'Educação',
                    description: 'Categoria para despesas com educação'
                },
                {
                    id: '3',
                    name: 'Lazer',
                    description: 'Categoria para despesas com lazer'
                },
                {
                    id: '4',
                    name: 'Moradia',
                    description: 'Categoria para despesas com moradia'
                },
                {
                    id: '5',
                    name: 'Saúde',
                    description: 'Categoria para despesas com saúde'
                },
                {
                    id: '6',
                    name: 'Transporte',
                    description: 'Categoria para despesas com transporte'
                }
            ]);
        });
    }
}