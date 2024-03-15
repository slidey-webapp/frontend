import { Tooltip, Typography } from '@mui/material';
import React, { ChangeEvent, DragEventHandler, useEffect, useRef } from 'react';
import _ from 'lodash';
import { Control, Controller } from 'react-hook-form';
import { FormField } from '../BaseForm';
import clsx from 'clsx';
import BaseIcon from '~/components/icons/BaseIcon';
import ButtonIconBase from '~/components/buttons/ButtonIconBase';
import ModalBase, { ModalBaseRef } from '~/components/modals/ModalBase';

interface ImagePickerProps extends Partial<FormField> {
    onChange?: (file?: File) => void;
    error?: boolean;
    helperText?: string;
    value?: File;
    defaultImage?: string;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
    disabled,
    required,
    name,
    onChange,
    error,
    helperText,
    defaultImage,
    value,
}) => {
    const [uploadState, setUploadState] = React.useState('initial');
    const [isOnDraggableZone, setIsOnDraggableZone] = React.useState(false);
    const [image, setImage] = React.useState<string | undefined>(defaultImage);
    const [file, setFile] = React.useState<File | undefined>(value);

    // useEffect(() => {
    //     readAsDataURL(value, true);
    // }, [value]);

    const modalRef = useRef<ModalBaseRef>(null);

    const handleUploadClick = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        readAsDataURL(file);
    };

    const readAsDataURL = (file?: File, ignoreChange?: boolean) => {
        !ignoreChange && onChange?.(file);
        if (!file) return;
        const reader = new FileReader();
        setFile(file);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result as string);
            setUploadState('uploaded');
        };
    };

    const handleEnterDraggableZone: DragEventHandler<HTMLLabelElement> = event => {
        event.preventDefault();
        if (!isOnDraggableZone) setIsOnDraggableZone(true);
    };

    const handleLeaveDraggableZone: DragEventHandler<HTMLLabelElement> = event => {
        event.preventDefault();
        if (!!isOnDraggableZone) setIsOnDraggableZone(false);
    };

    const handleDrop: DragEventHandler<HTMLLabelElement> = event => {
        event.preventDefault();
        const file = event.dataTransfer.files?.[0];
        readAsDataURL(file);
    };

    const handleViewImage = () => {
        if (!image) return;

        modalRef.current?.onOpen(
            <div
                style={{
                    height: '80vh',
                }}
            >
                <div className="w-full h-full">
                    <img
                        src={image}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            </div>,
            'Xem hình ảnh',
            '80%',
        );
    };

    const handleDeleteImage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        setFile(undefined);
        onChange?.(undefined);
        setImage(undefined);
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
                    accept="image/png, image/jpeg"
                    onChange={handleUploadClick}
                />
                <label
                    htmlFor={`image-picker-field${name}`}
                    className={'w-full h-full flex z-10 relative cursor-pointer group'}
                    draggable
                    onDragEnter={handleEnterDraggableZone}
                    onDrop={handleDrop}
                    onDragLeave={handleLeaveDraggableZone}
                    onDragOver={handleEnterDraggableZone}
                >
                    {image ? (
                        <>
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

                            <div
                                className={clsx(
                                    'absolute top-0 left-0 w-full h-full flex opacity-0 items-center justify-center',
                                    'transition-all duration-200 ease-in-out group-hover:!opacity-100 z-10 cursor-default',
                                )}
                                style={{
                                    background: 'rgba(0, 0, 0, 0.45)',
                                    color: '#fff',
                                }}
                            >
                                <ButtonIconBase
                                    icon="eye-outlined"
                                    tooltip="Xem ảnh"
                                    color="inherit"
                                    size={'large'}
                                    onClick={handleViewImage}
                                />
                                <ButtonIconBase
                                    icon="delete"
                                    tooltip="Xóa"
                                    color="inherit"
                                    size={'large'}
                                    onClick={e => handleDeleteImage(e)}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="p-3 w-full h-full">
                            <Typography
                                variant="caption"
                                className="block"
                                sx={{
                                    color: 'neutral.400',
                                }}
                            >
                                Hình ảnh
                            </Typography>
                            <div className="pt-2 pb-1 text-sm">
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
                                Ảnh được chấp nhận - JPG, JPEG, PNG
                            </Typography>
                            <Typography
                                variant="caption"
                                className="block"
                                sx={{
                                    color: 'neutral.400',
                                }}
                            >
                                Size ảnh tối đa 5MB
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
            <ModalBase ref={modalRef} className="overflow-hidden" />
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
