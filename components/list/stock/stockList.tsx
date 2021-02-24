import styled from "styled-components";
import { StockData } from "../../../interfaces";
import StockItem from "./stockItem";
import { Pagination } from "../../../components";

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const Title = styled.h5`
  text-align: center;
`;

const ListWrapper = styled.ul`
  width: 100%;
`;

interface Porps {
  list: StockData[];
  totalCnt: Number;
}

const StockList = ({ list, totalCnt }: Porps) => {
  const stockList = list.map((stock, index) => (
    <StockItem stock={stock} key={index} />
  ));

  return (
    <Wrapper>
      <Title>Stock List</Title>
      <ListWrapper>{stockList}</ListWrapper>
      <Pagination />
    </Wrapper>
  );
};

export default StockList;
