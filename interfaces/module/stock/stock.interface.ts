export interface Stock {
  stockName?: string;
  stockCode?: string;
}

export interface StockData extends Stock {
  stockNum?: number;
}

export interface Stocks {
  stocks: StockData[];
}

export interface StockState extends Stocks {
  stock: Stock | null;
}
