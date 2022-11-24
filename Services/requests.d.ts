export declare const getCurrency: (currencyId: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getSomeCurrencies: (currencyIds: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getTopCurrencies: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getCurrencies: (limit: number, offset: number) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getCurrencyChangesHistory: (currencyId: string) => Promise<import("axios").AxiosResponse<any, any>>;
