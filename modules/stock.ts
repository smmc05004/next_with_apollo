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
import { createAction, createReducer } from "@reduxjs/toolkit";

interface StocksProp {
  stocks: {
    list: StockData[];
    totalCnt: number;
  };
}

interface StocksRequestProps {
  page: number;
}

// export const stockRequest = ({ stockCode, stockName }: Stock): StockRequest => {
//   return {
//     type: StockActionTypes.STOCK_REQUEST,
//     payload: { stockCode, stockName },
//   };
// };

export const stockRequest = createAction<Stock>(StockActionTypes.STOCK_REQUEST);

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

// export const stocksRequest = ({ page }: StocksRequestProps): StocksRequest => {
//   return {
//     type: StockActionTypes.STOCKS_REQUEST,
//     payload: { page },
//   };
// };
export const stocksRequest = createAction<StocksRequestProps>(
  StockActionTypes.STOCKS_REQUEST
);

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
  stocks: {
    list: [],
    totalCnt: 0,
  },
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
  const { payload } = action;
  if (!payload) return;

  const getListRes = yield call(stockAPI.getStocks, payload);
  console.log("getListRes: ", getListRes);

  if (getListRes.status === 200) {
    const { list, totalCnt } = getListRes.data;
    yield put(stocksSuccess({ stocks: { list, totalCnt } }));
  } else {
    yield put(stockFailure());
  }
}

export function* stockSaga() {
  yield takeLatest(StockActionTypes.STOCK_REQUEST, stockRequestSaga);
  yield takeLatest(StockActionTypes.STOCKS_REQUEST, stocksRequestSaga);
}

// const stock = (state = initState, action: StockActions): StockState => {
//   switch (action.type) {
//     case StockActionTypes.STOCK_SUCCESS:
//       const stock = action.stock;
//       return {
//         ...state,
//         stock: stock,
//       };
//     case StockActionTypes.STOCKS_SUCCESS:
//       const stocks = action.stocks;

//       return {
//         ...state,
//         stocks: stocks,
//       };
//     default:
//       return {
//         ...state,
//       };
//   }

// };

const stock = createReducer(initState, {
  [StockActionTypes.STOCKS_SUCCESS]: (state, action) => {
    const stocks = action.stocks;
    return {
      ...state,
      stocks: stocks,
    };
  },
});

export default stock;
