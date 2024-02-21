import { TextField } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormField } from '../BaseForm';

interface Props extends FormField {
    control: Control<any>;
}

const BaseTextAreaField: React.FC<Props> = ({ control, name, ...props }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => {
                return (
                    // todo: text area...
                    <TextField
                        variant="outlined"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        error={invalid}
                        multiline
                        rows={4}
                        helperText={error?.message}
                        {...props}
                    />
                );
            }}
        />
    );
};

export default BaseTextAreaField;
