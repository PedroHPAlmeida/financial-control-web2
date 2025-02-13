import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
    constructor() {
        super();
        this.itemsPerPageLabel = 'Itens por página:';
        this.nextPageLabel = 'Próxima página';
        this.previousPageLabel = 'Página anterior';
        this.firstPageLabel = 'Primeira página';
        this.lastPageLabel = 'Última página';
    }
}