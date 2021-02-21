import express, { Request, Response } from "express";
import { connection } from "../../db/connection";
import { addStockQuery } from "../../db/query/stock";

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

module.exports = stockRouter;
