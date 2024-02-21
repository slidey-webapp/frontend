import { SxProps, Theme, Tooltip } from '@mui/material';
import clsx from 'clsx';
import _ from 'lodash';
import { MuiColorInput } from 'mui-color-input';
import React, { useRef } from 'react';
import BaseIcon, { BaseIconProps } from '~/components/icons/BaseIcon';
import { ChartType, HorizontalAlignment, TextSize, TextSizes, VerticalAlignment } from '~/types/shared';
import { usePresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';

interface Props {}

interface Config {
    title: string;
    rows: Array<{
        label: string;
        items?: Array<{
            icon: BaseIconProps['type'];
            tooltip: string | React.ReactNode;
            onClick: () => void;
            disabled?: boolean;
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
    const { currentSlideId, slides, onUpdatePresentation } = usePresentationContext();
    const currentSlideIndex = slides.findIndex(x => x.slideID === currentSlideId);
    const slide = slides.find(x => x.slideID === currentSlideId);
    if (!slide || currentSlideIndex === -1) return null;

    const textColorRef = useRef<string>(slide.textColor);
    const textBackgroundRef = useRef<string>(slide.textBackground);

    const handleUpdatePresentation = ({ field, newValue }: { field: keyof SlideDto; newValue: any }) => {
        const oldValue = _.get(slide, field);
        if (_.isEqual(oldValue, newValue)) return;

        const slidesCloned = _.cloneDeep(slides);

        if (field === 'textSize') {
            let textSize: TextSize = TextSize.Medium;

            const oldIndex = TextSizes.findIndex(size => size === oldValue);
            if (newValue === 'increase') {
                textSize = TextSizes[oldIndex + 1];
            } else {
                textSize = TextSizes[oldIndex - 1];
            }

            slidesCloned[currentSlideIndex] = {
                ...slide,
                [field]: textSize,
            };
        } else {
            slidesCloned[currentSlideIndex] = {
                ...slide,
                [field]: newValue,
            };
        }

        onUpdatePresentation({
            slides: slidesCloned,
        });
    };

    const configs: Config[] = [
        {
            title: 'Văn bản',
            rows: [
                {
                    label: 'Theo chiều ngang',
                    items: [
                        {
                            icon: 'horizontal-align-left',
                            active: slide.horizontalAlignment === HorizontalAlignment.Left,
                            onClick: () =>
                                handleUpdatePresentation({
                                    field: 'horizontalAlignment',
                                    newValue: HorizontalAlignment.Left,
                                }),
                            tooltip: 'Trái',
                        },
                        {
                            icon: 'horizontal-align-center',
                            active: slide.horizontalAlignment === HorizontalAlignment.Center,
                            onClick: () =>
                                handleUpdatePresentation({
                                    field: 'horizontalAlignment',
                                    newValue: HorizontalAlignment.Center,
                                }),
                            tooltip: 'Giữa',
                        },
                        {
                            icon: 'horizontal-align-right',
                            active: slide.horizontalAlignment === HorizontalAlignment.Right,
                            onClick: () =>
                                handleUpdatePresentation({
                                    field: 'horizontalAlignment',
                                    newValue: HorizontalAlignment.Right,
                                }),
                            tooltip: 'Phải',
                        },
                    ],
                },
                {
                    label: 'Theo chiều dọc',
                    items: [
                        {
                            icon: 'vertical-align-top',
                            active: slide.verticalAlignment === VerticalAlignment.Top,
                            onClick: () =>
                                handleUpdatePresentation({
                                    field: 'verticalAlignment',
                                    newValue: VerticalAlignment.Top,
                                }),
                            tooltip: 'Trên',
                        },
                        {
                            icon: 'vertical-align-center',
                            active: slide.verticalAlignment === VerticalAlignment.Middle,
                            onClick: () =>
                                handleUpdatePresentation({
                                    field: 'verticalAlignment',
                                    newValue: VerticalAlignment.Middle,
                                }),
                            tooltip: 'Giữa',
                        },
                        {
                            icon: 'vertical-align-bottom',
                            active: slide.verticalAlignment === VerticalAlignment.Bottom,
                            onClick: () =>
                                handleUpdatePresentation({
                                    field: 'verticalAlignment',
                                    newValue: VerticalAlignment.Bottom,
                                }),
                            tooltip: 'Dưới',
                        },
                    ],
                },
                {
                    label: 'Cỡ chữ',
                    items: [
                        {
                            icon: 'text-decrease',
                            onClick: () =>
                                handleUpdatePresentation({
                                    field: 'textSize',
                                    newValue: 'decrease',
                                }),
                            disabled: !slide.textSize || slide.textSize === TextSize.ExtraSmall,
                            tooltip: 'Giảm',
                        },
                        {
                            icon: 'text-increase',
                            onClick: () =>
                                handleUpdatePresentation({
                                    field: 'textSize',
                                    newValue: 'increase',
                                }),
                            disabled: !slide.textSize || slide.textSize === TextSize.ExtraLarge,
                            tooltip: 'Tăng',
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
                    node: (
                        <MuiColorInput
                            format="hex"
                            value={textColorRef.current}
                            sx={colorInputSx}
                            onChange={color => (textColorRef.current = color)}
                            PopoverProps={{
                                onBlur: ({ relatedTarget }) => {
                                    if (relatedTarget?.nodeName === 'BUTTON') {
                                        handleUpdatePresentation({
                                            field: 'textColor',
                                            newValue: textColorRef.current,
                                        });
                                    }
                                },
                            }}
                        />
                    ),
                },
                {
                    label: 'Màu nền',
                    node: (
                        <MuiColorInput
                            format="hex"
                            sx={colorInputSx}
                            value={textBackgroundRef.current}
                            onChange={color => (textBackgroundRef.current = color)}
                            PopoverProps={{
                                onBlur: ({ relatedTarget }) => {
                                    if (relatedTarget?.nodeName === 'BUTTON') {
                                        handleUpdatePresentation({
                                            field: 'textBackground',
                                            newValue: textBackgroundRef.current,
                                        });
                                    }
                                },
                            }}
                        />
                    ),
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
                                                                    <Tooltip
                                                                        title={item.tooltip}
                                                                        key={item.icon}
                                                                        placement="top"
                                                                    >
                                                                        <div
                                                                            className={clsx(
                                                                                'w-8 h-8 flex items-center justify-center cursor-pointer',
                                                                                'transition-all ease-in-out duration-100 border border-transparent hover:bg-indigo-50',
                                                                                {
                                                                                    'bg-indigo-50 border-indigo-500 hover:!bg-indigo-100':
                                                                                        item.active,
                                                                                    'rounded-l-lg': index === 0,
                                                                                    'rounded-r-lg ':
                                                                                        index ===
                                                                                        (row.items?.length || 0) - 1,
                                                                                    'cursor-not-allowed': item.disabled,
                                                                                },
                                                                            )}
                                                                            onClick={
                                                                                item.disabled ? undefined : item.onClick
                                                                            }
                                                                        >
                                                                            <BaseIcon type={item.icon} />
                                                                        </div>
                                                                    </Tooltip>
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

                    {slide.type === 'MULTIPLE_CHOICE' && (
                        <div className="p-4 border-t border-neutral-100">
                            <div className="font-semibold mb-4">{'Biểu đồ'}</div>
                            <div className="grid grid-cols-1 gap-y-4">
                                <div className="col-span-1 flex justify-between items-center gap-x-4 flex-nowrap">
                                    {[
                                        {
                                            icon: 'bar-chart' as BaseIconProps['type'],
                                            active: slide.chartType === ChartType.Bar,
                                            onClick: () =>
                                                handleUpdatePresentation({
                                                    field: 'chartType',
                                                    newValue: ChartType.Bar,
                                                }),
                                            tooltip: 'Biểu đồ Cột',
                                        },
                                        {
                                            icon: 'line-chart' as BaseIconProps['type'],
                                            active: slide.chartType === ChartType.Line,
                                            onClick: () =>
                                                handleUpdatePresentation({
                                                    field: 'chartType',
                                                    newValue: ChartType.Line,
                                                }),
                                            tooltip: 'Biểu đồ Đường',
                                        },
                                        {
                                            icon: 'donut-chart' as BaseIconProps['type'],
                                            active: slide.chartType === ChartType.Donut,
                                            onClick: () =>
                                                handleUpdatePresentation({
                                                    field: 'chartType',
                                                    newValue: ChartType.Donut,
                                                }),
                                            tooltip: 'Biểu đồ Donut',
                                        },
                                        {
                                            icon: 'pie-chart' as BaseIconProps['type'],
                                            active: slide.chartType === ChartType.Pie,
                                            onClick: () =>
                                                handleUpdatePresentation({
                                                    field: 'chartType',
                                                    newValue: ChartType.Pie,
                                                }),
                                            tooltip: 'Biểu đồ Tròn',
                                        },
                                    ].map(x => {
                                        return (
                                            <div className="flex-1" key={x.icon}>
                                                <Tooltip title={x.tooltip} placement="top">
                                                    <div
                                                        className={clsx(
                                                            'w-full h-10 rounded-lg border border-neutral-100 flex items-center justify-center',
                                                            'transition-all ease-in-out duration-100 hover:border-indigo-500 cursor-pointer',
                                                            {
                                                                'bg-indigo-50 border-indigo-500 hover:!bg-indigo-100':
                                                                    x.active,
                                                            },
                                                        )}
                                                        onClick={x.onClick}
                                                    >
                                                        <BaseIcon type={x.icon} size={28} />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EditorDesign;
