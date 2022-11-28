export interface ICurrency {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
}
export interface Currency {
    currency: ICurrency;
}
export interface ICurrencies {
    currencies: ICurrency[];
}
export declare enum CurrenciesActionTypes {
    UPLOAD_CURRENCIES = "UPLOAD_CURRENCIES"
}
export interface UploadCurrenciesAction {
    type: CurrenciesActionTypes.UPLOAD_CURRENCIES;
    payload: ICurrency[];
}
export interface IHistory {
    priceUsd: string;
    time: number;
    date: string;
}
