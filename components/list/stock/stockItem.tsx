import { StockData } from "../../../interfaces";
import styled from "styled-components";

const Item = styled.li`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Code = styled.div`
  width: 50%;
  text-align: center;
`;

const Name = styled.div`
  width: 50%;
  text-align: center;
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
      </Wrapper>
    </Item>
  );
};

export default StockItem;
