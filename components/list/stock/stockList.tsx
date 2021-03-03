import styled from "styled-components";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { StockData } from "../../../interfaces";
import stockSlice from "../../../modules/stock";
import StockItem from "./stockItem";
import { RootStateInterface } from "../../../interfaces/rootState";
import { createSelector } from "@reduxjs/toolkit";

const stock_list = (state: RootStateInterface) => state.stock.stocks.list;
const stock_cnt = (state: RootStateInterface) => state.stock.stocks.totalCnt;

export const getList = createSelector([stock_list, stock_cnt], (list, cnt) => {
  const newList = list.map((item, index) => ({
    stockNum: item.stockNum,
    stockName: item.stockName,
    stockCode: item.stockCode + "aaa",
  }));
  // console.log("newList: ", newList);

  return newList;
});

export const getCnt = createSelector(
  [stock_list, stock_cnt],
  (list, cnt) => cnt + 5
);

const Wrapper = styled.div`
  padding: 5px 20px 20px 20px;
`;

const Title = styled.h5`
  text-align: center;
`;

const ListWrapper = styled.ul`
  width: 100%;
  margin: 10px 0;
`;

const PaginationWrapper = styled.div``;

interface Porps {
  list: StockData[];
  totalCnt: number;
}

// const StockList = ({ list, totalCnt }: Porps) => {
const StockList = () => {
  // const { stock_list, total_cnt } = useSelector(
  //   (state: RootStateInterface) => ({
  //     stock_list: state.stock.stocks.list,
  //     total_cnt: state.stock.stocks.totalCnt,
  //     // isLogined: state.auth.isLogined,
  //   }),
  //   shallowEqual
  // );
  const { stock_list, total_cnt } = useSelector(
    (state: RootStateInterface) => ({
      stock_list: getList(state),
      total_cnt: getCnt(state),
      // isLogined: state.auth.isLogined,
    })
    // shallowEqual
  );

  console.log("리스트 렌더링");
  const dispatch = useDispatch();

  const [pageNum, setPageNum] = useState<number>(1);

  const onPageHandle = (event: Object, page: number) => {
    setPageNum(page);
    // dispatch(stocksRequest({ page }));
    dispatch(stockSlice.actions.STOCKS_REQUEST({ page }));
  };

  const stockList = function () {
    // return list.map((stock, index) => <StockItem stock={stock} key={index} />);
    return stock_list.map((stock, index) => (
      <StockItem stock={stock} key={index} />
    ));
  };

  return (
    <Wrapper>
      <Title>Stock List</Title>
      {/* {list && <ListWrapper>{stockList()}</ListWrapper>} */}
      {stock_list && <ListWrapper>{stockList()}</ListWrapper>}
      <PaginationWrapper>
        <Pagination
          size="small"
          shape="rounded"
          showFirstButton
          showLastButton
          // count={totalCnt}
          count={total_cnt}
          defaultPage={1}
          page={pageNum}
          onChange={onPageHandle}
        />
      </PaginationWrapper>
    </Wrapper>
  );
};

export default StockList;
// export default React.memo(StockList);
