export declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    addedCurrencies: import("../../Types/portfolio").IAddedCurrencies;
    currencies: import("../../Types/currencies").ICurrencies;
}>, import("../../Types/portfolio").PortfolioAction | import("../../Types/currencies").UploadCurrenciesAction>;
export declare type RootState = ReturnType<typeof rootReducer>;
