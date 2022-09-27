import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box } from '@mui/material';
import { getAggregationData, getAggregationDataForChart, getGridSize, getLegendOption } from '@/modules/utils/chartUtil';
import data from '@/pages/Data';

const LineChart = props => {
  const { option, dataSet, axisReverse, seriesOp, defaultOp, createOp } = props;

  const [componentOption, setComponentOption] = useState({});

  const defaultComponentOption = {
    grid: { top: 50, right: 50, bottom: 50, left: 50 },
    tooltip: { trigger: 'axis' },
    [!axisReverse ? 'xAxis' : 'yAxis']: {
      type: 'category',
    },
    [!axisReverse ? 'yAxis' : 'xAxis']: {
      type: 'value',
    },
    series: [],
    emphasis: {
      focus: 'series',
      blurScope: 'coordinateSystem',
    },
    ...defaultOp,
  };

  useEffect(() => {
    if (option && dataSet) {
      const newOption = createComponentOption();
      // console.log('linechart new option', newOption);
      setComponentOption(newOption);
    }
  }, [option, dataSet]);

  /**
   *
   * 위젯옵션과 데이터로
   * 컴포넌트에 맞는 형태로 생성
   */
  const createComponentOption = () => {
    let newOption = {};

    // series option에서 가져오기
    const newSeries = [];
    console.log('option.series.', option.xField);
    let data = [];
    option.series.forEach(item => {
      data = getAggregationDataForChart(dataSet, option.xField, item.field, item.aggregation);
      if (item.field) {
        console.log('data ', data);
        const series = {
          name: item.field,
          data: data.map(dataItem => dataItem[item.field]),
          type: item.type ? item.type : 'line',
          color: item.color,
          smooth: true,
          ...seriesOp,
        };
        newSeries.push(series);
      }
    });
    // console.log('new series', newSeries);
    if (data) {
      const op = {
        [!axisReverse ? 'xAxis' : 'yAxis']: {
          type: 'category',
          data: !!option[!axisReverse ? 'xField' : 'yField']
            ? data.map(item => item[option[!axisReverse ? 'xField' : 'yField']])
            : '',
        },
        series: newSeries,
        grid: getGridSize(option.legendPosition),
        legend: getLegendOption(option.legendPosition),
        ...createOp,
      };

      newOption = { ...defaultComponentOption, ...op };
    }

    return newOption;
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <ReactECharts option={componentOption} style={{ height: '100%', width: '100%' }} lazyUpdate={true} notMerge={true} />
    </Box>
  );
};

export default LineChart;
