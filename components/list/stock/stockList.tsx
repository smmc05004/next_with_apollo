import styled from "styled-components";
import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import { StockData } from "../../../interfaces";
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

const StockList = () => {
  const [pageNum, setPageNum] = useState<number>(1);

  const onPageHandle = (event: Object, page: number) => {
    setPageNum(page);
    // dispatch(stocksRequest({ page }));
    console.log("스탁 추가");
  };

  return (
    <Wrapper>
      <Title>Stock List</Title>
      <PaginationWrapper></PaginationWrapper>
    </Wrapper>
  );
};

export default StockList;
