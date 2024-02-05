import { EChartsOption } from 'echarts';
import { motion } from 'framer-motion';
import React, { useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/components/charts/ReactECharts';
import { COLORS, ShowFontSizeConstant } from '~/configs/constants';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ShowMultipleChoiceSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    const chartRef = useRef<ReactEChartsRef>(null);

    const renderChart = () => {
        const dataXAxis = slide.options.map(x => ({
            value: x.option,
            textStyle: {
                fontSize: 24,
            },
        }));
        const dataSeries = slide.options.map((opt, index) => {
            return {
                // todo: add result...
                value: index,
                itemStyle: {
                    color: COLORS[index],
                },
            };
        });

        const options: EChartsOption = {
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
            xAxis: {
                data: dataXAxis,
            },
            yAxis: {
                show: false,
            },
            series: [
                {
                    type: 'bar',
                    data: dataSeries,
                },
            ],
        };

        return <ReactECharts ref={chartRef} option={options} style={{ height: 650 }} />;
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div
                className="font-semibold mb-2 w-full text-left"
                style={{
                    fontSize: ShowFontSizeConstant.HEADING,
                }}
            >
                {slide.question.split(' ').map((el, i) => (
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
