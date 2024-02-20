import { SxProps, Theme } from '@mui/material';
import clsx from 'clsx';
import { MuiColorInput } from 'mui-color-input';
import React from 'react';
import BaseIcon, { BaseIconProps } from '~/components/icons/BaseIcon';

interface Props {}

interface Config {
    title: string;
    rows: Array<{
        label: string;
        items?: Array<{
            icon: BaseIconProps['type'];
            active?: boolean;
        }>;
        node?: JSX.Element;
    }>;
}

const colorInputSx: SxProps<Theme> = {
    '& .MuiInputBase-root': {
        padding: '4px',
        width: 105,
        height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#dbdce1',
        borderRadius: '4px',
        cursor: 'default',
        '& .MuiInputAdornment-root': {
            margin: '0px !important',
            '& button': {
                width: 24,
                height: 24,
                cursor: 'pointer',
                padding: 0,
                aspectRatio: 'unset',
                boxShadow: 'unset',
                border: '1px solid #e7e8eb',
            },
        },
        '& > input': {
            padding: 0,
            marginLeft: '4px',
        },
    },
};

const EditorDesign: React.FC<Props> = () => {
    const configs: Config[] = [
        {
            title: 'Văn bản',
            rows: [
                {
                    label: 'Theo chiều ngang',
                    items: [
                        {
                            icon: 'horizontal-align-left',
                            active: true,
                        },
                        {
                            icon: 'horizontal-align-center',
                        },
                        {
                            icon: 'horizontal-align-right',
                        },
                    ],
                },
                {
                    label: 'Theo chiều dọc',
                    items: [
                        {
                            icon: 'vertical-align-top',
                        },
                        {
                            icon: 'vertical-align-center',
                        },
                        {
                            icon: 'vertical-align-bottom',
                            active: true,
                        },
                    ],
                },
                {
                    label: 'Cỡ chữ',
                    items: [
                        {
                            icon: 'text-decrease',
                        },
                        {
                            icon: 'text-increase',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Màu sắc',
            rows: [
                {
                    label: 'Màu chữ',
                    node: <MuiColorInput format="hex" value="#123123" sx={colorInputSx} />,
                },
                {
                    label: 'Màu nền',
                    node: <MuiColorInput format="hex" value="#444444" sx={colorInputSx} />,
                },
            ],
        },
    ];

    return (
        <>
            <div className="w-full h-14 px-4 flex items-center justify-between border-b border-neutral-100">
                <div className="font-bold text-xl">Thiết kế</div>
            </div>
            <div className="overflow-x-hidden overflow-y-auto flex-1">
                <div className="flex flex-col">
                    {configs.map((config, configIndex) => {
                        return (
                            <div
                                className={clsx('p-4', {
                                    'border-b border-neutral-100': configIndex < configs.length - 1,
                                })}
                                key={config.title}
                            >
                                <div className="font-semibold mb-4">{config.title}</div>
                                <div className="grid grid-cols-1 gap-y-4">
                                    {config.rows.map((row, rowIndex) => {
                                        return (
                                            <div
                                                className="col-span-1 flex justify-between items-center"
                                                key={row.label}
                                            >
                                                <div className="flex text-sm font-semibold">{row.label}</div>
                                                <div className="flex justify-end">
                                                    {row.items && (
                                                        <div className="w-fit flex rounded-lg border border-neutral-100">
                                                            {row.items.map((item, index) => {
                                                                return (
                                                                    <div
                                                                        className={clsx(
                                                                            'w-8 h-8 flex items-center justify-center cursor-pointer',
                                                                            'transition-all ease-in-out duration-100 border border-transparent hover:bg-[#eff5ff]',
                                                                            {
                                                                                'bg-[#eff5ff] border-[#165ddb] hover:!bg-[#d1e2ff]':
                                                                                    item.active,
                                                                            },
                                                                            {
                                                                                'rounded-l-lg': index === 0,
                                                                            },
                                                                            {
                                                                                'rounded-r-lg ':
                                                                                    index ===
                                                                                    (row.items?.length || 0) - 1,
                                                                            },
                                                                        )}
                                                                        key={item.icon}
                                                                    >
                                                                        <BaseIcon type={item.icon} />
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                    {row.node}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default EditorDesign;
