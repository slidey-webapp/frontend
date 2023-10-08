import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormField } from '../BaseForm';

interface Props extends FormField {
    control: Control<any>;
}

const BaseSelectField: React.FC<Props> = ({ control, name, options = [], ...props }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => {
                const id = `select-field-${name}`;
                return (
                    <FormControl fullWidth error={invalid}>
                        <InputLabel required={props.required} id={id}>
                            {props.label}
                        </InputLabel>
                        <Select
                            {...props}
                            labelId={id}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            SelectDisplayProps={{
                                style: {
                                    lineHeight: '1.4375em',
                                },
                            }}
                        >
                            {options.map(({ value, label }) => {
                                return (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {error?.message && <FormHelperText>{error.message}</FormHelperText>}
                    </FormControl>
                );
            }}
        />
    );
};

export default BaseSelectField;
