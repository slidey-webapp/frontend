import { EChartsOption } from 'echarts';
import React, { CSSProperties, useMemo, useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/components/charts/ReactECharts';
import { COLORS, PreviewFontSizeConstant } from '~/configs/constants';
import { ChartType, HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { IPresentationContext } from '../../PresentationDetailPage';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
    hover?: IPresentationContext['hover'];
}

const PreviewMultipleChoiceSlide: React.FC<Props> = ({ slide, hover }) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    const verticalAlignment = useMemo<CSSProperties | undefined>(() => {
        const verAlign = hover?.verticalAlignment || slide.verticalAlignment;

        if (verAlign === VerticalAlignment.Top)
            return {
                justifyContent: 'flex-start',
            };

        if (verAlign === VerticalAlignment.Middle)
            return {
                justifyContent: 'center',
            };

        if (verAlign === VerticalAlignment.Bottom)
            return {
                justifyContent: 'flex-end',
            };

        return {
            justifyContent: 'flex-start',
        };
    }, [slide.verticalAlignment, hover]);

    const horizontalAlignment = useMemo<CSSProperties | undefined>(() => {
        const horAlign = hover?.horizontalAlignment || slide.horizontalAlignment;

        if (horAlign === HorizontalAlignment.Left)
            return {
                textAlign: 'left',
            };

        if (horAlign === HorizontalAlignment.Center)
            return {
                textAlign: 'center',
            };

        if (horAlign === HorizontalAlignment.Right)
            return {
                textAlign: 'right',
            };

            return {
                textAlign: 'left',
            };
    }, [slide.horizontalAlignment, hover]);

    const { headingSize, secondarySize } = useMemo<{
        headingSize: string;
        secondarySize: string;
    }>(() => {
        switch (slide.textSize) {
            case TextSize.ExtraSmall:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_EXTRA_SMALL,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_EXTRA_SMALL,
                };
            case TextSize.Small:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_SMALL,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_SMALL,
                };
            case TextSize.Large:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_LARGE,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_LARGE,
                };
            case TextSize.ExtraLarge:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_EXTRA_LARGE,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_EXTRA_LARGE,
                };
            case TextSize.Medium:
            default:
                return {
                    headingSize: PreviewFontSizeConstant.HEADING_MEDIUM,
                    secondarySize: PreviewFontSizeConstant.SECONDARY_MEDIUM,
                };
        }
    }, [slide.textSize]);

    const chartRef = useRef<ReactEChartsRef>(null);

    const renderChart = () => {
        const dataXAxis = slide.options.map(x => x.option);
        const dataSeries = slide.options.map((x, index) => ({
            value: hover?.chartType ? Math.round(Math.random() * 10) : 0,
            itemStyle: {
                color: COLORS[index],
            },
            name: x.option,
        }));

        const getOptions = (): EChartsOption => {
            const chartType = hover?.chartType || slide.chartType;
            switch (chartType) {
                case ChartType.Line:
                    return {
                        xAxis: {
                            data: dataXAxis,
                            show: true,
                        },
                        yAxis: {
                            show: false,
                        },
                        series: {
                            type: 'line',
                            data: dataSeries,
                        },
                    };
                case ChartType.Pie:
                    return {
                        xAxis: {
                            show: false,
                        },
                        yAxis: {
                            show: false,
                        },
                        legend: {
                            show: false,
                        },
                        series: {
                            type: 'pie',
                            radius: '75%',
                            data: dataSeries,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                        },
                    };
                case ChartType.Donut:
                    return {
                        xAxis: {
                            show: false,
                        },
                        yAxis: {
                            show: false,
                        },
                        legend: {
                            show: false,
                        },
                        series: {
                            type: 'pie',
                            radius: ['40%', '75%'],
                            data: dataSeries,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                                },
                            },
                        },
                    };
                case ChartType.Bar:
                default:
                    return {
                        xAxis: {
                            data: dataXAxis,
                            show: true,
                        },
                        yAxis: {
                            show: false,
                        },
                        series: {
                            type: 'bar',
                            data: dataSeries,
                        },
                    };
            }
        };

        const options: EChartsOption = {
            legend: {
                bottom: 0,
            },
            tooltip: {
                textStyle: {
                    fontFamily: 'lato, helvetica, arial, verdana, sans-serif, "FontAwesome"',
                    color: '#ffff',
                },
                backgroundColor: 'rgb(64, 64, 64)',
                borderWidth: 0,
            },
            ...getOptions(),
        };

        return <ReactECharts ref={chartRef} option={options} style={{ height: 300 }} />;
    };

    return (
        <div
            className="w-full h-full flex flex-col"
            style={{
                color: slide.textColor,
                ...verticalAlignment,
            }}
            key={'PreviewMultipleChoiceSlide' + slide.slideID}
        >
            <div
                className={'font-semibold mb-2'}
                style={{
                    fontSize: headingSize,
                    ...horizontalAlignment,
                }}
            >
                {slide.question}
            </div>
            <div className="w-full flex-1">{renderChart()}</div>
        </div>
    );
};

export default PreviewMultipleChoiceSlide;
