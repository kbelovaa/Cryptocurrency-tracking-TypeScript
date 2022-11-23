import { FC } from 'react';
import 'hammerjs';
import '@progress/kendo-theme-material/dist/all.css';
import './CurrencyChart.scss';
interface CurrencyChartProps {
    currencyId: string;
}
declare const CurrencyChart: FC<CurrencyChartProps>;
export default CurrencyChart;
