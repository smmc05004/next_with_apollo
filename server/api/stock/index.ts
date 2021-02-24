import express, { Request, Response } from "express";
import { connection } from "../../db/connection";
import { addStockQuery, selectStocksQuery } from "../../db/query/stock";

const stockRouter = express.Router();

stockRouter.post("/stock", (req: Request, res: Response) => {
  const { stockCode, stockName } = req.body;
  const insertQuery = addStockQuery({ stockCode, stockName });

  try {
    connection.query(insertQuery, (err, queryRes) => {
      if (!err && queryRes) {
        res.send({ status: 200, details: { stockCode, stockName } });
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

stockRouter.get("/stocks", (req: Request, res: Response) => {
  console.log("body: ", req.body);
  const selectQuery = selectStocksQuery();

  try {
    connection.query(selectQuery, (err, queryRes) => {
      if (!err && queryRes) {
        console.log("queryRes: ", queryRes);
        res.send(queryRes);
      } else {
        console.log("err: ", err);
      }
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = stockRouter;
