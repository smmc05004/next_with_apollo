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
import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
  PrepareAction,
} from "@reduxjs/toolkit";
import { RootStateInterface } from "../interfaces/rootState";
import { Action } from "redux-actions";

interface StocksProp {
  stocks: {
    list: StockData[];
    totalCnt: number;
  };
}

interface StocksRequestProps {
  page: number;
}

interface StockRequestProps {
  stock: Stock | null;
}

const prefix = "STOCK";

// export const stockRequest = ({ stockCode, stockName }: Stock): StockRequest => {
//   return {
//     type: StockActionTypes.STOCK_REQUEST,
//     payload: { stockCode, stockName },
//   };
// };

// stock request
export const stockRequest = createAction<Stock>(StockActionTypes.STOCK_REQUEST);

// stock success
export const stockSuceess = ({ stockCode, stockName }: Stock): StockSuccess => {
  return {
    type: StockActionTypes.STOCK_SUCCESS,
    stock: { stockCode, stockName },
  };
};

// stock failure
export const stockFailure = (): StockFailure => {
  return {
    type: StockActionTypes.STOCK_FAILURE,
  };
};

// stocks request
// export const stocksRequest = ({ page }: StocksRequestProps): StocksRequest => {
//   return {
//     type: StockActionTypes.STOCKS_REQUEST,
//     payload: { page },
//   };
// };

// export const stocksRequest = createAction<StocksRequestProps>(
//   // StockActionTypes.STOCKS_REQUEST
//   `${prefix}/STOCKS_REQUEST`
// );

// export const stocksRequest = createAction<PrepareAction<StocksRequestProps>>(
//   // StockActionTypes.STOCKS_REQUEST
//   `${prefix}/STOCKS_REQUEST`,
//   function prepare({ page }) {
//     console.log("page: ", page);

//     return {
//       payload: { page },
//     };
//   }
// );

// stocks success
// export const stocksSuccess = ({ stocks }: StocksProp): StocksSuccess => {
//   return {
//     type: StockActionTypes.STOCKS_SUCCESS,
//     stocks: stocks,
//   };
// };
// export const stocksSuccess = createAction<StocksProp>(
//   `${prefix}/STOCKS_SUCCESS`
// );

// stocks failure
// export const stocksFailure = () => {
//   return {
//     type: StockActionTypes.STOCKS_FAILURE,
//   };
// };

export const stocksFailure = createAction<undefined>(
  `${prefix}StockActionTypes.STOCKS_SUCCESS`
);

// prepare function useage
// export const stocksFailure = createAction<PrepareAction<string>>(
//   `${prefix}StockActionTypes.STOCKS_SUCCESS`,
//   function prepare(aa: number) {
//     return {
//       payload: aa + "",
//       error: console.log("stocksFailure error occured"),
//     };
//   }
// );

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

  if (getListRes.status === 200) {
    const { list, totalCnt } = getListRes.data;
    // yield put(stocksSuccess({ stocks: { list, totalCnt } }));
    yield put(
      stockSlice.actions.STOCKS_SUCCESS({ stocks: { list, totalCnt } })
    );
  } else {
    yield put(stocksFailure());
  }
}

export function* stockSaga() {
  yield takeLatest(StockActionTypes.STOCK_REQUEST, stockRequestSaga);
  // yield takeLatest(StockActionTypes.STOCKS_REQUEST, stocksRequestSaga);
  yield takeLatest(`${prefix}/STOCKS_REQUEST`, stocksRequestSaga);
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

// const stock = createReducer(initState, {
//   [StockActionTypes.STOCKS_SUCCESS]: (state, action) => {
//     const stocks = action.stocks;
//     return {
//       ...state,
//       stocks: stocks,
//     };
//   },
// });

const stock = {
  STOCK_SUCCESS: (
    state: StockState,
    { payload: { stock } }: PayloadAction<StockRequestProps>
  ) => ({
    ...state,
    stock: stock,
  }),
  STOCKS_REQUEST: (
    state: StockState,
    // { payload: { page } }: PayloadAction<StocksRequestProps>
    action: Action<StocksRequestProps>
  ) => ({
    ...state,
    stocks: {
      list: [],
      totalCnt: 0,
    },
  }),
  STOCKS_SUCCESS: (
    state: StockState,
    { payload: { stocks } }: PayloadAction<StocksProp>
  ) => ({
    ...state,
    stocks: stocks,
  }),
};

// const stock_list = (state: RootStateInterface) => state.stock.stocks.list;
// const stock_cnt = (state: RootStateInterface) => state.stock.stocks.totalCnt;

// export const getList = createSelector([stock_list, stock_cnt], (list, cnt) => {
//   const newList = list.map((item, index) => ({
//     stockNum: item.stockNum,
//     stockName: item.stockName,
//     stockCode: item.stockCode + "aaa",
//   }));
//   console.log("newList: ", newList);

//   return newList;
// });

// export const getCnt = createSelector(
//   [stock_list, stock_cnt],
//   (list, cnt) => cnt + 5
// );

const stockSlice = createSlice({
  reducers: stock,
  initialState: initState,
  name: prefix,
});

// export default stock;

export default stockSlice;
