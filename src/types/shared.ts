export type Id = string | number;
export interface WithId {
    id: Id;
}

export enum TransactionType {
    Expense = 'Expense',
    Income = 'Income',
}

type PositiveInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type GridCol = PositiveInt | 10 | 11 | 12;
export type GridClassNameCol = `col-span-${GridCol}`;

export interface ComboOption {
    value: Id;
    label: string;
}
