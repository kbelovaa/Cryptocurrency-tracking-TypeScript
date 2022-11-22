declare const _default: {
    makeTemporaryChoiceAction: (id: string) => import("../../Types/portfolio").PortfolioAction;
    addCurrencyAction: (currency: import("../../Types/portfolio").IAddedCurrency) => import("../../Types/portfolio").PortfolioAction;
    deleteCurrencyAction: (date: number) => import("../../Types/portfolio").PortfolioAction;
    fetchCurrencies: () => (dispatch: import("redux").Dispatch<import("../../Types/currencies").UploadCurrenciesAction>) => Promise<void>;
};
export default _default;
