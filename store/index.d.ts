declare const store: import("redux").Store<import("redux").EmptyObject & {
    addedCurrencies: import("../types/portfolio").IAddedCurrencies;
    currencies: import("../types/currencies").ICurrencies;
}, import("../types/portfolio").PortfolioAction | import("../types/currencies").UploadCurrenciesAction>;
export default store;
