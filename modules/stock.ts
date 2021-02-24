import { call, put, takeLatest } from "redux-saga/effects";
import {
  StockActionTypes,
  StockActions,
  StockRequest,
  StockSuccess,
  StockFailure,
  StocksRequest,
  StocksSuccess,
} from "../interfaces/module/stock/stockact.interface";
import {
  Stock,
  StockData,
  Stocks,
  StockState,
} from "../interfaces/module/stock/stock.interface";
import * as stockAPI from "../pages/api/stock";

interface StocksProp {
  stocks: StockData[];
}

export const stockRequest = ({ stockCode, stockName }: Stock): StockRequest => {
  return {
    type: StockActionTypes.STOCK_REQUEST,
    payload: { stockCode, stockName },
  };
};

export const stockSuceess = ({ stockCode, stockName }: Stock): StockSuccess => {
  return {
    type: StockActionTypes.STOCK_SUCCESS,
    stock: { stockCode, stockName },
  };
};

export const stockFailure = (): StockFailure => {
  return {
    type: StockActionTypes.STOCK_FAILURE,
  };
};

export const stocksRequest = () => {
  return {
    type: StockActionTypes.STOCKS_REQUEST,
  };
};

export const stocksSuccess = ({ stocks }: StocksProp): StocksSuccess => {
  return {
    type: StockActionTypes.STOCKS_SUCCESS,
    stocks: stocks,
  };
};

export const stocksFailure = () => {
  return {
    type: StockActionTypes.STOCKS_FAILURE,
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

  if (addRes.status === 200) {
    const { stockCode, stockName } = addRes.data.details;
    yield put(stockSuceess({ stockCode, stockName }));
  } else {
    yield put(stockFailure());
  }
}

function* stocksRequestSaga(action: StocksRequest) {
  const getRes = yield call(stockAPI.getStocks);

  if (getRes.status === 200) {
    const stockArr = getRes.data;
    yield put(stocksSuccess({ stocks: stockArr }));
  } else {
    yield put(stockFailure());
  }
}

export function* stockSaga() {
  yield takeLatest(StockActionTypes.STOCK_REQUEST, stockRequestSaga);
  yield takeLatest(StockActionTypes.STOCKS_REQUEST, stocksRequestSaga);
}

const stock = (state = initState, action: StockActions): StockState => {
  switch (action.type) {
    case StockActionTypes.STOCK_SUCCESS:
      const stock = action.stock;
      return {
        ...state,
        stock: stock,
      };
    case StockActionTypes.STOCKS_SUCCESS:
      const stocks = action.stocks;
      return {
        ...state,
        stocks: stocks,
      };
    default:
      return {
        ...state,
      };
  }
};

export default stock;
