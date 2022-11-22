import React, { FC, useEffect, useState } from 'react';
import { IHistory } from 'Types/currencies';
import { getCurrencyChangesHistory } from 'Services/requests';
import { round } from 'Utils/roundingFunctions';
import 'hammerjs';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-material/dist/all.css';
import './CurrencyChart.scss';

interface CurrencyChartProps {
  currencyId: string;
}

const CurrencyChart: FC<CurrencyChartProps> = ({ currencyId }) => {
  const [history, setHistory] = useState<IHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCurrencyChangesHistory(currencyId);
      const historyData: IHistory[] = response.data.data;
      setHistory(historyData.slice(-25));
    };

    fetchData();
  }, []);

  const info: number[] = history.map((data: IHistory) => round(data.priceUsd));
  const labels: string[] = history.map((data: IHistory) => data.date.slice(5, 10));

  const screenWidth: number = window.screen.width;

  return (
    <div className="chart">
      <Chart pannable style={screenWidth <= 900 ? (screenWidth <= 600 ? { height: 200 } : { height: 300 }) : {}}>
        <ChartTitle text="Recent change chart" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartValueAxis>
          <ChartValueAxisItem />
        </ChartValueAxis>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={screenWidth <= 900 ? [] : labels} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem type="line" tooltip={{ visible: true }} data={info} color="rgb(255, 238, 141)" />
        </ChartSeries>
      </Chart>
    </div>
  );
};

export default CurrencyChart;
