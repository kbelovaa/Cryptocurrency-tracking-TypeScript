declare const _default: {
    makeTemporaryChoiceAction: (id: string) => import("../../types/portfolio").PortfolioAction;
    addCurrencyAction: (currency: import("../../types/portfolio").IAddedCurrency) => import("../../types/portfolio").PortfolioAction;
    deleteCurrencyAction: (date: number) => import("../../types/portfolio").PortfolioAction;
    fetchCurrencies: (limit: number, offset: number) => (dispatch: import("redux").Dispatch<import("../../types/currencies").UploadCurrenciesAction>) => Promise<void>;
};
export default _default;
