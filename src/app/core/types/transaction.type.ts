export type TransactionType = 'CREDIT' | 'EXPENSE';

export type Month = 'JANUARY' | 'FEBRUARY' | 'MARCH' | 'APRIL' | 'MAY' | 'JUNE' | 'JULY' | 'AUGUST' | 'SEPTEMBER' | 'OCTOBER' | 'NOVEMBER' | 'DECEMBER';

export type TransactionCategory = {
    id: string;
    name: string;
    description: string;
    type: TransactionType;
}

export type Transaction = {
    id: string;
    title: string;
    description: string;
    value: number;
    type: TransactionType;
    currentMonth: Month;
    currentYear: number;
    date: string;
    timestamp: string;
    category: TransactionCategory;
    hasReceipt: boolean;
};

export type TransactionCreate = {
    title: string;
    description: string;
    value: number;
    type: TransactionType;
    currentMonth: number;
    currentYear: number;
    date: Date;
    categoryId?: string;
};

export type ConsolidatedTransactions = {
    title: string;
    total: number;
    transactions: Transaction[];
}

export type TransactionTotals = {
    credits: number;
    expenses: number;
}
