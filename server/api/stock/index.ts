import express, { Request, Response } from "express";
import url from "url";
import { connection } from "../../db/connection";
import {
  addStockQuery,
  selectStocksQuery,
  getTotalQuery,
} from "../../db/query/stock";

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
  const queryData = url.parse(req.url, true).query;
  const page = Number(queryData.page);
  const selectQuery = selectStocksQuery({ page });
  const totalQuery = getTotalQuery();

  try {
    connection.query(selectQuery, (err, queryRes) => {
      if (!err && queryRes) {
        // console.log("queryRes: ", queryRes);

        connection.query(totalQuery, (totalErr, totalQueryRes) => {
          // console.log("totalQueryRes: ", totalQueryRes);

          if (!totalErr && totalQueryRes) {
            const totalCnt = totalQueryRes[0].totalCnt;

            res.send({ list: queryRes, totalCnt });
          } else {
            console.log("totalErr: ", totalErr);
          }
        });
      } else {
        console.log("err: ", err);
      }
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = stockRouter;
