import { call, takeLatest } from "redux-saga/effects";
import {
  StockActionTypes,
  StockActions,
  StockRequest,
  StockSuccess,
  StockFailure,
} from "../interfaces/module/stock/stockact.interface";
import {
  Stock,
  Stocks,
  StockState,
} from "../interfaces/module/stock/stock.interface";
import * as stockAPI from "../pages/api/stock";

interface StockParam {
  stock: Stock;
}

export const stockRequest = ({ stockCode, stockName }: Stock): StockRequest => {
  return {
    type: StockActionTypes.STOCK_REQUEST,
    payload: { stockCode, stockName },
  };
};

export const stockSuceess = ({ stock }: StockParam): StockSuccess => {
  return {
    type: StockActionTypes.STOCK_SUCCESS,
    stock: stock,
  };
};

export const stockFailure = (): StockFailure => {
  return {
    type: StockActionTypes.STOCK_FAILURE,
  };
};

const initState: StockState = {
  stock: null,
  stocks: [],
};

function* stockRequestSaga(action: StockRequest) {
  const { payload } = action;

  if (!payload) return;

  const addRes = yield call(stockAPI.addStock, payload);
  console.log("addRes: ", addRes);
}

export function* stockSaga() {
  yield takeLatest(StockActionTypes.STOCK_REQUEST, stockRequestSaga);
}

const stock = (state = initState, action: StockActions): StockState => {
  switch (action.type) {
    case StockActionTypes.STOCK_SUCCESS:
      const stock = action.stock;
      return {
        ...state,
        stock: stock,
      };
    default:
      return {
        ...state,
      };
  }
};

export default stock;
