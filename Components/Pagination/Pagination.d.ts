import { FC } from 'react';
import './Pagination.scss';
interface PaginationProps {
    currenciesPerPage: number;
    totalCurrencies: number;
    currentPage: number;
}
declare const Pagination: FC<PaginationProps>;
export default Pagination;
