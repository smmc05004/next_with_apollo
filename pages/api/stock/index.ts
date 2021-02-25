import client from "../client";
import { Stock } from "../../../interfaces/module/stock/stock.interface";
import qs from "qs";

interface GetStocksProps {
  page: number;
}

export const addStock = async ({ stockCode, stockName }: Stock) => {
  return await client.post("/api/stock/stock", { stockCode, stockName });
};

export const getStocks = async ({ page }: GetStocksProps) => {
  const queryString = qs.stringify({
    page,
  });
  return await client.get(`/api/stock/stocks?${queryString}`);
};
