import React, { useImperativeHandle, useRef } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { FieldErrors, useForm } from 'react-hook-form';
import { MixedSchema, NumberSchema, ObjectSchema, ObjectShape, StringSchema, mixed, number, object, string } from 'yup';
import { ComboOption, GridClassNameCol } from '~/types/shared';
import Overlay, { OverlayRef } from '../loadings/Overlay';
import BaseDatePickerField from './fields/BaseDatePickerField';
import BaseImagePickerField from './fields/BaseImagePickerField';
import BasePasswordField from './fields/BasePasswordField';
import BaseSelectField from './fields/BaseSelectField';
import BaseTextAreaField from './fields/BaseTextAreaField';
import BaseTextField from './fields/BaseTextField';

export interface Props {
    fields: FormField[];
    className?: string;
    initialValues?: Record<string, any>;
    onSubmit: (formValues: Record<string, any> | any) => void;
    onError?: (errors: FieldErrors<Record<string, any>>) => void;
    buttons?: {
        submitButton?: React.ReactNode;
        closeButton?: React.ReactNode;
        renderButtonBefore?: () => React.ReactNode;
        renderButtonAfter?: () => React.ReactNode;
    };
    renderAdditionBeforeButton?: () => JSX.Element;
}

type FormFieldType =
    | 'text'
    | 'textArea'
    | 'number'
    | 'positive'
    | 'email'
    | 'password'
    | 'select'
    | 'date'
    | 'image'

export interface FormField {
    name: string;
    classNameCol: GridClassNameCol;
    type?: FormFieldType;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    options?: ComboOption[];
    defaultValue?: any;
    rows?: number;
    onChange?: (event: any) => void;
}

const convertObjectShape = (fields: FormField[]): ObjectShape => {
    const objectShape: ObjectShape = {};

    fields.forEach(field => {
        let schemaItem: StringSchema | NumberSchema | ObjectSchema<any> | MixedSchema = string();

        // type
        switch (field.type) {
            case 'text':
            case 'textArea':
                schemaItem = string();
                break;
            case 'password':
                schemaItem = string().min(6, `${field.label} phải có ít nhất 6 ký tự`);
                break;
            case 'number':
                schemaItem = number();
                break;
            case 'positive':
                schemaItem = number().positive();
                break;
            case 'email':
                schemaItem = string().email('Email không đúng định dạng');
                break;
            case 'image':
                const _2MbSize = 2097152;
                schemaItem = mixed().test('fileSize', 'The file is too large', (value?: File | any) => {
                    if (!value) return true; // attachment is optional
                    return value.size <= _2MbSize;
                });
                break;
            default:
                break;
        }

        // required
        if (field.required) schemaItem = schemaItem.required(`${field.label} không được trống`);

        Object.assign(objectShape, {
            [field.name]: schemaItem,
        });
    });

    return objectShape;
};

export interface BaseFormRef {
    getValues: () => Record<string, any>;
    setValue: (name: string, value: any) => void;
    isValid: () => Promise<boolean>;
    resetValues: () => void;
    mask: () => void;
    unmask: () => void;
}

const BaseForm = React.forwardRef<BaseFormRef, Props>(
    ({ fields, initialValues, className, renderAdditionBeforeButton, onError, onSubmit, buttons }, ref) => {
        const overlayRef = useRef<OverlayRef>(null);

        const schema = object().shape(convertObjectShape(fields));

        const { handleSubmit, control, getValues, setValue, reset, trigger } = useForm({
            defaultValues: initialValues,
            resolver: yupResolver(schema),
        });

        const renderField = (field: FormField) => {
            switch (field.type) {
                case 'email':
                    return <BaseTextField {...field} control={control} />;
                case 'text':
                    return <BaseTextField {...field} control={control} />;
                case 'textArea':
                    return <BaseTextAreaField {...field} control={control} />;
                case 'number':
                    return <BaseTextField {...field} control={control} />;
                case 'positive':
                    return <BaseTextField {...field} type="number" control={control} />;
                case 'password':
                    return <BasePasswordField {...field} control={control} />;
                case 'select':
                    return <BaseSelectField {...field} control={control} />;
                case 'date':
                    return <BaseDatePickerField {...field} control={control} />;
                case 'image':
                    return <BaseImagePickerField {...field} control={control} />;
                default:
                    return <></>;
            }
        };

        useImperativeHandle(
            ref,
            () => ({
                getValues,
                setValue,
                isValid,
                resetValues: reset,
                mask: () => overlayRef.current?.open(),
                unmask: () => overlayRef.current?.close(),
            }),
            [],
        );

        const isValid = async () => await trigger();

        return (
            <form className={clsx('relative', className)} onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <div className="grid grid-cols-12 gap-4">
                    {fields.map(field => {
                        return (
                            <div className={field.classNameCol} key={field.name}>
                                {renderField(field)}
                            </div>
                        );
                    })}
                </div>
                {renderAdditionBeforeButton?.()}
                {buttons && (
                    <div className="w-full mt-6 flex items-center justify-end">
                        {buttons?.renderButtonBefore?.()}
                        {buttons?.closeButton}
                        {buttons?.submitButton}
                        {buttons?.renderButtonAfter?.()}
                    </div>
                )}
                <Overlay ref={overlayRef} />
            </form>
        );
    },
);
export default BaseForm;
