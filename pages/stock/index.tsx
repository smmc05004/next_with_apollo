import styled from "styled-components";
import { useEffect, useState } from "react";
import { Modal, Button, StockList } from "../../components";
import { RootStateInterface } from "../../interfaces/rootState";
import { createSelector } from "@reduxjs/toolkit";

const StockWrapper = styled.div`
  position: relative;
`;

const BtnWrapper = styled.div`
  animation: float_ani 1s linear infinite alternate;
`;

const Stock = () => {
  const [open, setOpen] = useState<boolean>(false);

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
    console.log("제출");
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
    // dispatch(stocksRequest({ page: 1 }));
  }, []);

  return (
    <StockWrapper>
      <span>stock 페이지</span>

      <BtnWrapper>
        <Button type="button" onClick={onOpenModal}>
          STOCK LIST
        </Button>
      </BtnWrapper>
    </StockWrapper>
  );
};

export default Stock;
