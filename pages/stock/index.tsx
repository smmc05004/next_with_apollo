import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockRequest, stocksRequest } from "../../modules/stock";
import { Modal, Button } from "../../components";
import styled from "styled-components";
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
  const { stockList } = useSelector((state: RootStateInterface) => ({
    stockList: state.stock.stocks,
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
    dispatch(stocksRequest());
  }, []);

  return (
    <StockWrapper>
      <span>stock 페이지</span>

      <Modal
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmit}
        list={stockList}
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
