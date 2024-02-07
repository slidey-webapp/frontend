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

    const { question, options } = slide;

    const chartRef = useRef<ReactEChartsRef>(null);

    const renderChart = () => {
        const dataXAxis = options.map(x => ({
            value: x.option,
            textStyle: {
                fontSize: 24,
            },
        }));
        const dataSeries = options.map((opt, index) => {
            return {
                value: opt.chosenAmount ?? 0,
                itemStyle: {
                    color: COLORS[index],
                },
            };
        });

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

        chartRef.current && chartRef.current?.reRender(eChartsOption)

        return <ReactECharts ref={chartRef} option={eChartsOption} style={{ height: 650 }} />;
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div
                className="font-semibold mb-2 w-full text-left"
                style={{
                    fontSize: ShowFontSizeConstant.HEADING,
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
