import { Typography } from '@mui/material';
import React, { ChangeEvent, DragEventHandler } from 'react';
import _ from 'lodash';
import { Control, Controller } from 'react-hook-form';
import { FormField } from '../BaseForm';

interface ImagePickerProps extends Partial<FormField> {
    onChange?: (file?: File) => void;
    error?: boolean;
    helperText?: string;
    value?: File;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
    disabled,
    required,
    name,
    onChange,
    error,
    helperText,
    value,
}) => {
    const [uploadState, setUploadState] = React.useState('initial');
    const [isOnDraggableZone, setIsOnDraggableZone] = React.useState(false);
    const [image, setImage] = React.useState<string>('');

    const handleUploadClick = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        readAsDataURL(file);
    };

    const readAsDataURL = (file?: File) => {
        onChange?.(file);
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result as string);
                setUploadState('uploaded');
            };
        }
    };

    const handleEnterDraggableZone: DragEventHandler<HTMLLabelElement> = (event) => {
        event.preventDefault();
        if (!isOnDraggableZone) setIsOnDraggableZone(true);
    };

    const handleLeaveDraggableZone: DragEventHandler<HTMLLabelElement> = (event) => {
        event.preventDefault();
        if (!!isOnDraggableZone) setIsOnDraggableZone(false);
    };

    const handleDrop: DragEventHandler<HTMLLabelElement> = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        readAsDataURL(file);
    };

    return (
        <div className="">
            <div
                className="w-full h-36 rounded-lg relative overflow-hidden border"
                style={{
                    borderColor: error ? '#F04438' : '#9DA4AE',
                    transition:
                        'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                }}
            >
                <input
                    type="file"
                    className="hidden"
                    style={{
                        borderRadius: 'inherit',
                    }}
                    id={`image-picker-field${name}`}
                    accept="image/*"
                    onChange={handleUploadClick}
                />
                <label
                    htmlFor={`image-picker-field${name}`}
                    className="w-full h-full flex z-10 relative cursor-pointer"
                    draggable
                    onDragEnter={handleEnterDraggableZone}
                    onDrop={handleDrop}
                    onDragLeave={handleLeaveDraggableZone}
                    onDragOver={handleEnterDraggableZone}
                >
                    {image ? (
                        <img
                            src={image}
                            alt=""
                            width={0}
                            height={0}
                            style={{
                                borderRadius: 'inherit',
                            }}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="px-[14px] py-[16.5px]">
                            <Typography
                                variant="caption"
                                className="block"
                                sx={{
                                    color: 'neutral.400',
                                }}
                            >
                                Hình ảnh
                            </Typography>
                            <div className="pt-2 pb-1">
                                Kéo thả để đính kèm hoặc
                                <span className="text-green-500 ml-1">Tải lên</span>
                            </div>
                            <Typography
                                className="block"
                                variant="caption"
                                sx={{
                                    color: 'neutral.400',
                                }}
                            >
                                Image file formats - JPG, JPEG, PNG, GIF
                            </Typography>
                            <Typography
                                variant="caption"
                                className="block"
                                sx={{
                                    color: 'neutral.400',
                                }}
                            >
                                Image size less than 2MB
                            </Typography>
                        </div>
                    )}
                </label>
            </div>
            {helperText && (
                <p
                    className="text-xs mt-[3px] mx-3.5 leading-[1.66]"
                    style={{
                        color: '#F04438',
                    }}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
};

export interface Props extends FormField {
    control: Control<any>;
}

const BaseImagePickerField: React.FC<Props> = ({ control, name, ...props }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => {
                return (
                    <ImagePicker
                        {...props}
                        onChange={onChange}
                        value={value}
                        error={invalid}
                        helperText={error?.message}
                    />
                );
            }}
        />
    );
};

export default BaseImagePickerField;
