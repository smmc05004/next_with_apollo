import { call, put, takeLatest } from "redux-saga/effects";
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

// interface StockParam {
//   stock: Stock;
// }

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
    yield put(stockSuceess({stockCode, stockName}));
  } else {
    yield put(stockFailure());
  }
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
