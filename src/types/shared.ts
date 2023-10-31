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

export interface AuditedTimeDto {
    createdAt: Date;
    updatedAt: Date;
}

export interface AuditedDto extends AuditedTimeDto {
    createdBy: number;
}
export interface FullAuditedDto extends AuditedDto {
    deletedAt: Date;
}

export interface BaseFormModalProps {
    onSuccess: () => void;
    onClose: () => void;
    modalType: 'create' | 'update' | 'detail';
}
