import { EChartsOption } from 'echarts';
import { motion } from 'framer-motion';
import React, { CSSProperties, useMemo, useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/components/charts/ReactECharts';
import { COLORS, ShowFontSizeConstant } from '~/configs/constants';
import { ChartType, HorizontalAlignment, TextSize, VerticalAlignment } from '~/types/shared';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ShowMultipleChoiceSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    const { question, options } = slide;

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
                    headingSize: ShowFontSizeConstant.HEADING_EXTRA_SMALL,
                    secondarySize: ShowFontSizeConstant.SECONDARY_EXTRA_SMALL,
                };
            case TextSize.Small:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_SMALL,
                    secondarySize: ShowFontSizeConstant.SECONDARY_SMALL,
                };
            case TextSize.Large:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_LARGE,
                    secondarySize: ShowFontSizeConstant.SECONDARY_LARGE,
                };
            case TextSize.ExtraLarge:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_EXTRA_LARGE,
                    secondarySize: ShowFontSizeConstant.SECONDARY_EXTRA_LARGE,
                };
            case TextSize.Medium:
            default:
                return {
                    headingSize: ShowFontSizeConstant.HEADING_MEDIUM,
                    secondarySize: ShowFontSizeConstant.SECONDARY_MEDIUM,
                };
        }
    }, [slide.textSize]);

    const chartRef = useRef<ReactEChartsRef>(null);

    const renderChart = () => {
        const dataXAxis = options.map(x => ({
            value: x.option,
            textStyle: {
                fontSize: secondarySize,
            },
        }));

        const dataSeries = options.map((opt, index) => {
            return {
                value: opt.chosenAmount ?? 0,
                itemStyle: {
                    color: COLORS[index],
                },
                name: opt.option,
            };
        });

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

        const eChartsOption: EChartsOption = {
            legend: {
                bottom: 0,
            },
            tooltip: {
                textStyle: {
                    fontFamily: 'lato, helvetica, arial, verdana, sans-serif, "FontAwesome"',
                    color: '#ffff',
                    fontSize: 24,
                },
                backgroundColor: 'rgb(64,64,64)',
                borderWidth: 0,
                verticalAlign: 'middle',
                align: 'center',
            },
            ...getOptions(),
        };

        chartRef.current && chartRef.current?.reRender(eChartsOption);

        return <ReactECharts ref={chartRef} option={eChartsOption} style={{ height: 650 }} />;
    };

    return (
        <div
            className="w-full h-full flex flex-col"
            style={{
                color: slide.textColor,
                ...verticalAlignment,
            }}
            key={'ShowMultipleChoiceSlide' + slide.slideID}
        >
            <div
                className={'font-semibold mb-2'}
                style={{
                    fontSize: headingSize,
                    ...horizontalAlignment,
                }}
            >
                {question.split(' ').map((el, i) => (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
                            delay: i / 10,
                        }}
                        key={i}
                    >
                        {el}{' '}
                    </motion.span>
                ))}
            </div>
            <div className="w-full flex-1">{renderChart()}</div>
        </div>
    );
};

export default ShowMultipleChoiceSlide;
