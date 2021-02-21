import { Stock, StockData, Stocks } from "./stock.interface";

export enum StockActionTypes {
  STOCK_REQUEST = "STOCK_REQUEST",
  STOCK_SUCCESS = "STOCK_SUCCESS",
  STOCK_FAILURE = "STOCK_FAILURE",
  STOCKS_REQUEST = "STOCKS_REQUEST",
  STOCKS_SUCCESS = "STOCKS_SUCCESS",
  STOCKS_FAILURE = "STOCKS_FAILURE",
}

export type StockActions = StockRequest | StockSuccess | StockFailure;

export interface StockRequest {
  type: StockActionTypes.STOCK_REQUEST;
  payload: Stock;
}

export interface StockSuccess {
  type: StockActionTypes.STOCK_SUCCESS;
  stock: Stock;
}

export interface StockFailure {
  type: StockActionTypes.STOCK_FAILURE;
}
