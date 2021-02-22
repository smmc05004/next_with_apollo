import { Stock } from "../../../../interfaces/module/stock/stock.interface";

const addStockQuery = ({ stockCode, stockName }: Stock) => {
  const query = `
    INSERT INTO stock
    (stock_code, stock_name) 
    VALUES
    ('${stockCode}', '${stockName}')
    `;
  return query;
};

const selectStocksQuery = () => {
  const query = `
    SELECT
      stock_num as stockNum
      , stock_code as stockCode
      , stock_name as stockName
    FROM
      stock
  `;
  return query;
};

export { addStockQuery, selectStocksQuery };
