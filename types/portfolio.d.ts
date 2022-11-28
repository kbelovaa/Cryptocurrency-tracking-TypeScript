export interface IAddedCurrency {
    id: string;
    quantity: number;
    firstPrice: string;
    date: number;
}
export interface IAddedCurrencies {
    addedCurrencies: IAddedCurrency[];
    temporaryChoice: string;
}
export declare enum PortfolioActionTypes {
    MAKE_TEMPORARY_CHOICE = "MAKE_TEMPORARY_CHOICE",
    ADD_CURRENCY = "ADD_CURRENCY",
    DELETE_CURRENCY = "DELETE_CURRENCY"
}
interface MakeTemporaryChoiceAction {
    type: PortfolioActionTypes.MAKE_TEMPORARY_CHOICE;
    payload: string;
}
interface AddCurrencyAction {
    type: PortfolioActionTypes.ADD_CURRENCY;
    payload: IAddedCurrency;
}
interface DeleteCurrencyAction {
    type: PortfolioActionTypes.DELETE_CURRENCY;
    payload: number;
}
export type PortfolioAction = MakeTemporaryChoiceAction | AddCurrencyAction | DeleteCurrencyAction;
export {};
