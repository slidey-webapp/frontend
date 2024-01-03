import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import { MixedSchema, NumberSchema, ObjectSchema, ObjectShape, StringSchema, mixed, number, object, string } from 'yup';
import { ComboOption, GridClassNameCol } from '~/types/shared';
import BaseDatePickerField from './fields/BaseDatePickerField';
import BaseImagePickerField from './fields/BaseImagePickerField';
import BasePasswordField from './fields/BasePasswordField';
import BaseSelectField from './fields/BaseSelectField';
import BaseTextAreaField from './fields/BaseTextAreaField';
import BaseTextField from './fields/BaseTextField';

export interface Props {
    fields: FormField[];
    initialValues?: Record<string, any>;
    onSubmit: (formValues: Record<string, any> | any) => void;
    onError?: (errors: FieldErrors<Record<string, any>>) => void;
    buttons: {
        submitButton?: React.ReactNode;
        closeButton?: React.ReactNode;
        renderButtonBefore?: () => React.ReactNode;
        renderButtonAfter?: () => React.ReactNode;
    };
}

type FormFieldType = 'text' | 'richText' | 'number' | 'positive' | 'email' | 'password' | 'select' | 'date' | 'image';

export interface FormField {
    name: string;
    classNameCol: GridClassNameCol;
    type?: FormFieldType;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    options?: ComboOption[];
    defaultValue?: any;
}

const convertObjectShape = (fields: FormField[]): ObjectShape => {
    const objectShape: ObjectShape = {};

    fields.forEach(field => {
        let schemaItem: StringSchema | NumberSchema | ObjectSchema<any> | MixedSchema = string();

        // type
        switch (field.type) {
            case 'text':
            case 'richText':
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

const BaseForm: React.FC<Props> = ({ fields, initialValues, onError, onSubmit, buttons }) => {
    const schema = object().shape(convertObjectShape(fields));

    const { handleSubmit, control } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const renderField = (field: FormField) => {
        switch (field.type) {
            case 'email':
                return <BaseTextField {...field} control={control} />;
            case 'text':
                return <BaseTextField {...field} control={control} />;
            case 'richText':
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

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <div className="grid grid-cols-12 gap-4">
                {fields.map(field => {
                    return (
                        <div className={field.classNameCol} key={field.name}>
                            {renderField(field)}
                        </div>
                    );
                })}
            </div>
            <div className="w-full mt-6 flex items-center justify-end">
                {buttons.renderButtonBefore?.()}
                {buttons.closeButton}
                {buttons.submitButton}
                {buttons.renderButtonAfter?.()}
            </div>
        </form>
    );
};

export default BaseForm;
