import { BaseTextFieldProps, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormField } from '../BaseForm';

type Props = FormField &
    BaseTextFieldProps & {
        control: Control<any>;
    };

const BaseTextField: React.FC<Props> = ({ control, name, ...props }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => {
                return (
                    <TextField
                        variant="outlined"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        error={invalid}
                        helperText={error?.message}
                        {...props}
                    />
                );
            }}
        />
    );
};

export default BaseTextField;
