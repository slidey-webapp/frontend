import { EChartsOption } from 'echarts';
import React, { CSSProperties, useMemo, useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/components/charts/ReactECharts';
import { PreviewFontSizeConstant } from '~/configs/constants';
import { ChartType, HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const PreviewMultipleChoiceSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    const verticalAlignment = useMemo<CSSProperties | undefined>(() => {
        if (slide.verticalAlignment === VerticalAlignment.Top)
            return {
                justifyContent: 'flex-start',
            };

        if (slide.verticalAlignment === VerticalAlignment.Middle)
            return {
                justifyContent: 'center',
            };

        if (slide.verticalAlignment === VerticalAlignment.Bottom)
            return {
                justifyContent: 'flex-end',
            };

        return undefined;
    }, [slide.verticalAlignment]);

    const horizontalAlignment = useMemo<CSSProperties | undefined>(() => {
        if (slide.horizontalAlignment === HorizontalAlignment.Left)
            return {
                textAlign: 'left',
            };

        if (slide.horizontalAlignment === HorizontalAlignment.Center)
            return {
                textAlign: 'center',
            };

        if (slide.horizontalAlignment === HorizontalAlignment.Right)
            return {
                textAlign: 'right',
            };

        return undefined;
    }, [slide.horizontalAlignment]);

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
        const dataSeries = slide.options.map(x => 0);
        const dataPieSeries = slide.options.map(x => ({
            value: 0,
            name: x.option,
        }));

        const getOptions = (): EChartsOption => {
            switch (slide.chartType) {
                case ChartType.Line:
                    return {
                        xAxis: {
                            data: dataXAxis,
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
                        legend: {
                            show: false,
                        },
                        series: {
                            type: 'pie',
                            radius: '75%',
                            data: dataPieSeries,
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
                        legend: {
                            show: false,
                        },
                        series: {
                            type: 'pie',
                            radius: ['40%', '75%'],
                            data: dataPieSeries,
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
            {renderChart()}
        </div>
    );
};

export default PreviewMultipleChoiceSlide;
