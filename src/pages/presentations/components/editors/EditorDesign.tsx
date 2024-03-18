import { SxProps, Theme, Tooltip, TooltipProps } from '@mui/material';
import clsx from 'clsx';
import _ from 'lodash';
import { MuiColorInput } from 'mui-color-input';
import React from 'react';
import BaseIcon, { BaseIconProps } from '~/components/icons/BaseIcon';
import { ReactComponent as ImageBottom } from '~/images/slide/image-bottom.svg';
import { ReactComponent as ImageDefault } from '~/images/slide/image-default.svg';
import { ReactComponent as ImageFull } from '~/images/slide/image-full.svg';
import { ReactComponent as ImageLeft } from '~/images/slide/image-left.svg';
import { ReactComponent as ImageRight } from '~/images/slide/image-right.svg';
import { ReactComponent as ImageSideBySideLeft } from '~/images/slide/image-side-by-side-left.svg';
import { ReactComponent as ImageSideBySideRight } from '~/images/slide/image-side-by-side-right.svg';
import { ReactComponent as ImageTop } from '~/images/slide/image-top.svg';
import { ChartType, HorizontalAlignment, TextSize, TextSizes, VerticalAlignment } from '~/types/shared';
import { usePresentationContext } from '../../PresentationDetailPage';
import { SlideDto, SlideLayout } from '../../types/slide';

interface Props {}

interface Config {
    title: string;
    rows: Array<{
        label: string;
        items?: Array<{
            icon: BaseIconProps['type'];
            tooltip: string | React.ReactNode;
            onClick: () => void;
            onMouseOver?: () => void;
            onMouseLeave?: () => void;
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
    const { currentSlideId, slides, onUpdatePresentation, setHoverState, mask, unmask } = usePresentationContext();
    const currentSlideIndex = slides.findIndex(x => x.slideID === currentSlideId);
    const currentSlide = slides.find(x => x.slideID === currentSlideId);
    if (!currentSlide || currentSlideIndex === -1) return null;

    const slide: SlideDto = {
        ...currentSlide,
        verticalAlignment: currentSlide?.verticalAlignment || VerticalAlignment.Top,
        horizontalAlignment: currentSlide?.horizontalAlignment || HorizontalAlignment.Left,
        textSize: currentSlide?.textSize || TextSize.Medium,
        textColor: currentSlide?.textColor || '#000000',
        textBackground: currentSlide?.textBackground || '#ffffff',
        chartType: currentSlide?.chartType || ChartType.Bar,
    };

    let textColor = slide.textColor;
    let textBackground = slide.textBackground;

    const handleUpdatePresentation = async ({ field, newValue }: { field: keyof SlideDto; newValue: any }) => {
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

        mask();
        await onUpdatePresentation({
            slides: slidesCloned,
        });
        unmask();
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
                            onMouseOver: () =>
                                setHoverState(pre => ({
                                    ...pre,
                                    horizontalAlignment: HorizontalAlignment.Left,
                                })),
                            onMouseLeave: () =>
                                setHoverState(pre => {
                                    const preCloned = _.cloneDeep(pre);
                                    if (preCloned.horizontalAlignment === HorizontalAlignment.Left) {
                                        preCloned.horizontalAlignment = null;
                                    }

                                    return preCloned;
                                }),
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
                            onMouseOver: () =>
                                setHoverState(pre => ({
                                    ...pre,
                                    horizontalAlignment: HorizontalAlignment.Center,
                                })),
                            onMouseLeave: () =>
                                setHoverState(pre => {
                                    const preCloned = _.cloneDeep(pre);
                                    if (preCloned.horizontalAlignment === HorizontalAlignment.Center) {
                                        preCloned.horizontalAlignment = null;
                                    }

                                    return preCloned;
                                }),
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
                            onMouseOver: () =>
                                setHoverState(pre => ({
                                    ...pre,
                                    horizontalAlignment: HorizontalAlignment.Right,
                                })),
                            onMouseLeave: () =>
                                setHoverState(pre => {
                                    const preCloned = _.cloneDeep(pre);
                                    if (preCloned.horizontalAlignment === HorizontalAlignment.Right) {
                                        preCloned.horizontalAlignment = null;
                                    }

                                    return preCloned;
                                }),
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
                            onMouseOver: () =>
                                setHoverState(pre => ({
                                    ...pre,
                                    verticalAlignment: VerticalAlignment.Top,
                                })),
                            onMouseLeave: () =>
                                setHoverState(pre => {
                                    const preCloned = _.cloneDeep(pre);
                                    if (preCloned.verticalAlignment === VerticalAlignment.Top) {
                                        preCloned.verticalAlignment = null;
                                    }

                                    return preCloned;
                                }),
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
                            onMouseOver: () =>
                                setHoverState(pre => ({
                                    ...pre,
                                    verticalAlignment: VerticalAlignment.Middle,
                                })),
                            onMouseLeave: () =>
                                setHoverState(pre => {
                                    const preCloned = _.cloneDeep(pre);
                                    if (preCloned.verticalAlignment === VerticalAlignment.Middle) {
                                        preCloned.verticalAlignment = null;
                                    }

                                    return preCloned;
                                }),
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
                            onMouseOver: () =>
                                setHoverState(pre => ({
                                    ...pre,
                                    verticalAlignment: VerticalAlignment.Bottom,
                                })),
                            onMouseLeave: () =>
                                setHoverState(pre => {
                                    const preCloned = _.cloneDeep(pre);
                                    if (preCloned.verticalAlignment === VerticalAlignment.Bottom) {
                                        preCloned.verticalAlignment = null;
                                    }

                                    return preCloned;
                                }),
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
                            key={slide.textColor}
                            format="hex"
                            value={textColor}
                            sx={colorInputSx}
                            onChange={color => (textColor = color)}
                            PopoverProps={{
                                onBlur: ({ relatedTarget }) => {
                                    if (relatedTarget?.nodeName === 'BUTTON') {
                                        handleUpdatePresentation({
                                            field: 'textColor',
                                            newValue: textColor,
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
                            key={slide.textBackground}
                            format="hex"
                            sx={colorInputSx}
                            value={textBackground}
                            onChange={color => (textBackground = color)}
                            PopoverProps={{
                                onBlur: ({ relatedTarget }) => {
                                    if (relatedTarget?.nodeName === 'BUTTON') {
                                        handleUpdatePresentation({
                                            field: 'textBackground',
                                            newValue: textBackground,
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
                    <div className={'p-4 border-b border-neutral-200'}>
                        <div className="font-semibold mb-4">Bố cục</div>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                {
                                    Svg: ImageDefault,
                                    tooltip: 'Mặc định',
                                    key: SlideLayout.Default,
                                    active: !slide.layout || slide.layout === SlideLayout.Default,
                                    onMouseOver: () =>
                                        setHoverState(pre => ({
                                            ...pre,
                                            layout: SlideLayout.Default,
                                        })),
                                    onMouseLeave: () =>
                                        setHoverState(pre => {
                                            const preCloned = _.cloneDeep(pre);
                                            if (preCloned.layout === SlideLayout.Default) {
                                                preCloned.layout = null;
                                            }

                                            return preCloned;
                                        }),
                                    placement: 'top',
                                },
                                {
                                    Svg: ImageFull,
                                    tooltip: 'Ảnh full',
                                    key: SlideLayout.ImageFull,
                                    disabled: false,
                                    active: slide.layout === SlideLayout.ImageFull,
                                    onMouseOver: () =>
                                        setHoverState(pre => ({
                                            ...pre,
                                            layout: SlideLayout.ImageFull,
                                        })),
                                    onMouseLeave: () =>
                                        setHoverState(pre => {
                                            const preCloned = _.cloneDeep(pre);
                                            if (preCloned.layout === SlideLayout.ImageFull) {
                                                preCloned.layout = null;
                                            }

                                            return preCloned;
                                        }),
                                    placement: 'top',
                                },
                                {
                                    Svg: ImageSideBySideLeft,
                                    tooltip: 'Ảnh cạnh bên trái',
                                    key: SlideLayout.ImageSideLeft,
                                    disabled: false,
                                    active: slide.layout === SlideLayout.ImageSideLeft,
                                    onMouseOver: () =>
                                        setHoverState(pre => ({
                                            ...pre,
                                            layout: SlideLayout.ImageSideLeft,
                                        })),
                                    onMouseLeave: () =>
                                        setHoverState(pre => {
                                            const preCloned = _.cloneDeep(pre);
                                            if (preCloned.layout === SlideLayout.ImageSideLeft) {
                                                preCloned.layout = null;
                                            }

                                            return preCloned;
                                        }),
                                    placement: 'top',
                                },
                                {
                                    Svg: ImageSideBySideRight,
                                    tooltip: 'Ảnh cạnh bên phải',
                                    key: SlideLayout.ImageSideRight,
                                    disabled: false,
                                    active: slide.layout === SlideLayout.ImageSideRight,
                                    onMouseOver: () =>
                                        setHoverState(pre => ({
                                            ...pre,
                                            layout: SlideLayout.ImageSideRight,
                                        })),
                                    onMouseLeave: () =>
                                        setHoverState(pre => {
                                            const preCloned = _.cloneDeep(pre);
                                            if (preCloned.layout === SlideLayout.ImageSideRight) {
                                                preCloned.layout = null;
                                            }

                                            return preCloned;
                                        }),
                                    placement: 'top',
                                },
                                {
                                    Svg: ImageLeft,
                                    tooltip: 'Ảnh bên trái',
                                    key: SlideLayout.ImageLeft,
                                    disabled: false,
                                    active: slide.layout === SlideLayout.ImageLeft,
                                    onMouseOver: () =>
                                        setHoverState(pre => ({
                                            ...pre,
                                            layout: SlideLayout.ImageLeft,
                                        })),
                                    onMouseLeave: () =>
                                        setHoverState(pre => {
                                            const preCloned = _.cloneDeep(pre);
                                            if (preCloned.layout === SlideLayout.ImageLeft) {
                                                preCloned.layout = null;
                                            }

                                            return preCloned;
                                        }),
                                    placement: 'bottom',
                                },
                                {
                                    Svg: ImageRight,
                                    tooltip: 'Ảnh bên phải',
                                    key: SlideLayout.ImageRight,
                                    disabled: false,
                                    active: slide.layout === SlideLayout.ImageRight,
                                    onMouseOver: () =>
                                        setHoverState(pre => ({
                                            ...pre,
                                            layout: SlideLayout.ImageRight,
                                        })),
                                    onMouseLeave: () =>
                                        setHoverState(pre => {
                                            const preCloned = _.cloneDeep(pre);
                                            if (preCloned.layout === SlideLayout.ImageRight) {
                                                preCloned.layout = null;
                                            }

                                            return preCloned;
                                        }),
                                    placement: 'bottom',
                                },
                                {
                                    Svg: ImageTop,
                                    tooltip: 'Ảnh bên trên',
                                    key: SlideLayout.ImageTop,
                                    disabled: false,
                                    active: slide.layout === SlideLayout.ImageTop,
                                    onMouseOver: () =>
                                        setHoverState(pre => ({
                                            ...pre,
                                            layout: SlideLayout.ImageTop,
                                        })),
                                    onMouseLeave: () =>
                                        setHoverState(pre => {
                                            const preCloned = _.cloneDeep(pre);
                                            if (preCloned.layout === SlideLayout.ImageTop) {
                                                preCloned.layout = null;
                                            }

                                            return preCloned;
                                        }),
                                    placement: 'bottom',
                                },
                                {
                                    Svg: ImageBottom,
                                    tooltip: 'Ảnh bên dưới',
                                    key: SlideLayout.ImageBottom,
                                    disabled: false,
                                    active: slide.layout === SlideLayout.ImageBottom,
                                    onMouseOver: () =>
                                        setHoverState(pre => ({
                                            ...pre,
                                            layout: SlideLayout.ImageBottom,
                                        })),
                                    onMouseLeave: () =>
                                        setHoverState(pre => {
                                            const preCloned = _.cloneDeep(pre);
                                            if (preCloned.layout === SlideLayout.ImageBottom) {
                                                preCloned.layout = null;
                                            }

                                            return preCloned;
                                        }),
                                    placement: 'bottom',
                                },
                            ].map(x => {
                                return (
                                    <div key={x.key} className="col-span-1">
                                        <Tooltip title={x.tooltip} placement={x.placement as TooltipProps['placement']}>
                                            <div
                                                className={clsx(
                                                    'p-2 rounded-lg flex items-center justify-center cursor-pointer',
                                                    'transition-all ease-in-out duration-100 border border-neutral-100 hover:border-indigo-main',
                                                    {
                                                        '!border-indigo-500': x.active,
                                                        'cursor-not-allowed': x.disabled,
                                                    },
                                                )}
                                                onClick={() => {
                                                    if (x.disabled) return;
                                                    handleUpdatePresentation({
                                                        field: 'layout',
                                                        newValue: x.key,
                                                    });
                                                }}
                                                onMouseOver={x.onMouseOver}
                                                onMouseLeave={x.onMouseLeave}
                                            >
                                                <x.Svg />
                                            </div>
                                        </Tooltip>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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
                                                                            onMouseOver={item.onMouseOver}
                                                                            onMouseLeave={item.onMouseLeave}
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
                                            onMouseOver: () =>
                                                setHoverState(pre => ({
                                                    ...pre,
                                                    chartType: ChartType.Bar,
                                                })),
                                            onMouseLeave: () =>
                                                setHoverState(pre => {
                                                    const preCloned = _.cloneDeep(pre);
                                                    if (preCloned.chartType === ChartType.Bar) {
                                                        preCloned.chartType = null;
                                                    }

                                                    return preCloned;
                                                }),
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
                                            onMouseOver: () =>
                                                setHoverState(pre => ({
                                                    ...pre,
                                                    chartType: ChartType.Line,
                                                })),
                                            onMouseLeave: () =>
                                                setHoverState(pre => {
                                                    const preCloned = _.cloneDeep(pre);
                                                    if (preCloned.chartType === ChartType.Line) {
                                                        preCloned.chartType = null;
                                                    }

                                                    return preCloned;
                                                }),
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
                                            onMouseOver: () =>
                                                setHoverState(pre => ({
                                                    ...pre,
                                                    chartType: ChartType.Donut,
                                                })),
                                            onMouseLeave: () =>
                                                setHoverState(pre => {
                                                    const preCloned = _.cloneDeep(pre);
                                                    if (preCloned.chartType === ChartType.Donut) {
                                                        preCloned.chartType = null;
                                                    }

                                                    return preCloned;
                                                }),
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
                                            onMouseOver: () =>
                                                setHoverState(pre => ({
                                                    ...pre,
                                                    chartType: ChartType.Pie,
                                                })),
                                            onMouseLeave: () =>
                                                setHoverState(pre => {
                                                    const preCloned = _.cloneDeep(pre);
                                                    if (preCloned.chartType === ChartType.Pie) {
                                                        preCloned.chartType = null;
                                                    }

                                                    return preCloned;
                                                }),
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
                                                        onMouseOver={x.onMouseOver}
                                                        onMouseLeave={x.onMouseLeave}
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
