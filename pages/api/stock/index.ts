import client from "../client";
import { Stock } from "../../../interfaces/module/stock/stock.interface";

export const addStock = async ({ stockCode, stockName }: Stock) => {
  return await client.post("/api/stock/stock", { stockCode, stockName });
};

export const getStocks = async () => {
  return await client.get("/api/stock/stocks");
}