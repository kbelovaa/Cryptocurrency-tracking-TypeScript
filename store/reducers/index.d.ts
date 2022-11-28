export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    addedCurrencies: import("../../types/portfolio").IAddedCurrencies;
    currencies: import("../../types/currencies").ICurrencies;
}>, import("../../types/portfolio").PortfolioAction | import("../../types/currencies").UploadCurrenciesAction>;
export type RootState = ReturnType<typeof rootReducer>;
