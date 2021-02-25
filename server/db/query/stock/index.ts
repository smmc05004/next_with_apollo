import { Stock } from "../../../../interfaces/module/stock/stock.interface";

interface GetStocksQuery {
  page: number;
}

const addStockQuery = ({ stockCode, stockName }: Stock) => {
  const query = `
    INSERT INTO stock
    (stock_code, stock_name) 
    VALUES
    ('${stockCode}', '${stockName}')
    `;
  return query;
};

const selectStocksQuery = ({ page }: GetStocksQuery) => {
  const query = `
    SELECT
      stock_num as stockNum
      , stock_code as stockCode
      , stock_name as stockName
    FROM
      stock
    ORDER BY
      stock_num ASC
    LIMIT
      ${(page - 1) * 5}, ${5}
    
  `;
  return query;
};

const getTotalQuery = () => {
  const query = `
    SELECT
      COUNT(*) as totalCnt
    FROM
      stock
  `;
  return query;
};

export { addStockQuery, selectStocksQuery, getTotalQuery };
