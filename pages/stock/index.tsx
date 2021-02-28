import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import stockSlice, { stockRequest, stocksRequest } from "../../modules/stock";
import stockSlice, { stockRequest } from "../../modules/stock";
import { Modal, Button, StockList } from "../../components";
import { RootStateInterface } from "../../interfaces/rootState";
import { createSelector } from "@reduxjs/toolkit";

const StockWrapper = styled.div`
  position: relative;
`;

const BtnWrapper = styled.div`
  animation: float_ani 1s linear infinite alternate;
`;

// const stock_list = (state: RootStateInterface) => state.stock.stocks.list;
// const total_cnt = (state: RootStateInterface) => state.stock.stocks.totalCnt;

// const stock_list = (state: RootStateInterface) => state.stock.stocks.list;
// const stock_cnt = (state: RootStateInterface) => state.stock.stocks.totalCnt;

// const getList = createSelector([stock_list, stock_cnt], (list, cnt) => {
//   const newList = list.map((item, index) => ({
//     stockNum: item.stockNum,
//     stockName: item.stockName,
//     stockCode: item.stockCode + "aaa",
//   }));
//   console.log("newList: ", newList);

//   return newList;
// });

// const getCnt = createSelector([stock_list, stock_cnt], (list, cnt) => cnt + 5);

const Stock = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const { stockList, totalCnt } = useSelector(
    (state: RootStateInterface) => ({
      stockList: state.stock.stocks.list,
      totalCnt: state.stock.stocks.totalCnt,
      // isLogined: state.auth.isLogined,
    }),
    shallowEqual
  );
  // const { stock_list, stock_cnt } = useSelector(
  //   (state: RootStateInterface) => ({
  //     stock_list: getList(state),
  //     stock_cnt: getCnt(state),
  //   })
  // );

  // console.log("totalCnt: ", totalCnt);
  const onOpenModal = () => {
    setOpen(true);
  };

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    stockCode: string,
    stockName: string
  ) => {
    e.preventDefault();
    dispatch(stockRequest({ stockCode, stockName }));

    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
    dispatch(stockSlice.actions.STOCKS_REQUEST({ page: 1 }));
    // dispatch(stocksRequest({ page: 1 }));
  }, []);

  return (
    <StockWrapper>
      <span>stock 페이지</span>

      <Modal
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmit}
        list={stockList}
        totalCnt={totalCnt}
      />

      <BtnWrapper>
        <Button type="button" onClick={onOpenModal}>
          STOCK LIST
        </Button>
      </BtnWrapper>
    </StockWrapper>
  );
};

export default Stock;
