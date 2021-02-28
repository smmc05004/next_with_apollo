import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { StockData } from "../../../interfaces";
import stockSlice from "../../../modules/stock";
import StockItem from "./stockItem";

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

const StockList = ({ list, totalCnt }: Porps) => {
  console.log("리스트 렌더링");
  const dispatch = useDispatch();

  const [pageNum, setPageNum] = useState<number>(1);

  const onPageHandle = (event: Object, page: number) => {
    setPageNum(page);
    // dispatch(stocksRequest({ page }));
    dispatch(stockSlice.actions.STOCKS_REQUEST({ page }));
  };

  const stockList = function () {
    return list.map((stock, index) => <StockItem stock={stock} key={index} />);
  };

  return (
    <Wrapper>
      <Title>Stock List</Title>
      {list && <ListWrapper>{stockList()}</ListWrapper>}
      <PaginationWrapper>
        <Pagination
          size="small"
          shape="rounded"
          showFirstButton
          showLastButton
          count={totalCnt}
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
