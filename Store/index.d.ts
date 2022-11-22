declare const store: import("redux").Store<import("redux").EmptyObject & {
    addedCurrencies: import("../Types/portfolio").IAddedCurrencies;
    currencies: import("../Types/currencies").ICurrencies;
}, import("../Types/portfolio").PortfolioAction | import("../Types/currencies").UploadCurrenciesAction> & {
    dispatch: unknown;
};
export default store;
