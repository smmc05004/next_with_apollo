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
export { addStockQuery };
