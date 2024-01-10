import React from 'react';

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

export interface ComboOption<T = Id> {
    value: T;
    label: string | React.ReactNode;
}

export interface AuditedTimeDto {
    createdAt: Date;
    updatedAt?: Date;
}

export interface FullAuditedTimeDto extends AuditedTimeDto {
    deletedAt?: Date;
}

export interface FullAuditedDto extends AuditedTimeDto {
    createdBy: Id;
    updatedBy?: Id;
}

export interface BaseFormModalProps {
    onSuccess: () => void;
    onClose: () => void;
    modalType: 'create' | 'update' | 'detail';
}
