import { EChartsOption } from 'echarts';
import React, { useRef } from 'react';
import { ReactECharts, ReactEChartsRef } from '~/components/charts/ReactECharts';
import { SlideDto } from '../../types/slide';

interface Props {
    slide: SlideDto;
}

const ShowMultipleChoiceSlide: React.FC<Props> = ({ slide }) => {
    if (slide.type !== 'MULTIPLE_CHOICE') return null;

    const chartRef = useRef<ReactEChartsRef>(null);

    const renderChart = () => {
        const dataXAxis = slide.options.map(x => x.option);
        const dataSeries = slide.options.map(() => 0);

        const options: EChartsOption = {
            legend: {
                bottom: 0,
            },
            tooltip: {
                textStyle: {
                    fontFamily: 'lato, helvetica, arial, verdana, sans-serif, "FontAwesome"',
                    color: '#ffff',
                },
                backgroundColor: 'rgb(64,64,64)',
                borderWidth: 0,
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

        return <ReactECharts ref={chartRef} option={options} style={{ height: 300 }} />;
    };

    return <div className="w-full h-full flex flex-col items-center justify-center">{renderChart()}</div>;
};

export default ShowMultipleChoiceSlide;
