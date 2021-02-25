import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockRequest, stocksRequest } from "../../modules/stock";
import { Modal, Button } from "../../components";
import { RootStateInterface } from "../../interfaces/rootState";

const StockWrapper = styled.div`
  position: relative;
`;

const BtnWrapper = styled.div`
  animation: float_ani 1s linear infinite alternate;
`;

const Stock = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const { stockList, totalCnt } = useSelector((state: RootStateInterface) => ({
    stockList: state.stock.stocks.list,
    totalCnt: state.stock.stocks.totalCnt,
  }));

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
    dispatch(stocksRequest({ page: 1 }));
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
