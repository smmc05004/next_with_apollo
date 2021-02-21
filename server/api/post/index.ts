import express, { Request, Response } from "express";
import url from "url";
import { connection } from "../../db/connection";
import {
  addPostSql,
  getPostsSql,
  updateCompleteSql,
} from "../../db/query/post";

const postRouter = express.Router();

postRouter.post("/post", (req: Request, res: Response) => {
  const { contents, deadline, userId } = req.body.post;
  const insertQuery = addPostSql({ contents, deadline, userId });

  connection.query(insertQuery, (err, queryRes) => {
    if (!err) {
      res.send(queryRes);
    } else {
      throw err;
    }
  });
});

postRouter.get("/posts", (req: Request, res: Response) => {
  const queryData = url.parse(req.url, true).query;
  const userId = queryData.id as string;
  const selectQuery = getPostsSql({ userId });

  connection.query(selectQuery, (err, queryRes) => {
    if (!err) {
      res.send(queryRes);
    } else {
      throw err;
    }
  });
});

postRouter.put("/post", (req: Request, res: Response) => {
  const { id, status } = req.body;
  let completeFlag = status === "y" ? "n" : "y";
  const updateQuery = updateCompleteSql({ completeFlag, postId: id });

  connection.query(updateQuery, (err, queryRes) => {
    if (!err) {
      res.send({ status: 200, details: queryRes });
    } else {
      throw err;
    }
  });
});

module.exports = postRouter;
