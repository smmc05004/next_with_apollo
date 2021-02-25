import { StockData } from "../../../interfaces";
import styled from "styled-components";

const Item = styled.li`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Code = styled.div`
  width: 30%;
`;

const Name = styled.div`
  width: 50%;
`;

const DelBtn = styled.button`
  width: 20%;
  cursor: pointer;
`;

interface Props {
  stock: StockData;
}

const StockItem = ({ stock }: Props) => {
  return (
    <Item>
      <Wrapper>
        <Code>{stock.stockCode}</Code>
        <Name>{stock.stockName}</Name>
        <DelBtn>삭제</DelBtn>
      </Wrapper>
    </Item>
  );
};

export default StockItem;
