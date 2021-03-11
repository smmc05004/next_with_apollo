import express, { Request, Response } from "express";
import mysql from "mysql";
import { connection } from "../../db/connection";
import { getToken, verifyToken } from "./jwt";
import { getUserSql, addUserSql } from "../../db/query/auth";

// const Member = require("../../../models").Member;

const AuthRouter = express.Router();

AuthRouter.post("/user", (req: Request, res: Response) => {
  const user = req.body.user;
  const newName = user.name.replace(/(\s*)/g, "");
  const selectQuery = getUserSql({ userId: user.id });
  const insertQuery = addUserSql({ userId: user.id, newName: newName });

  connection.query(
    selectQuery,
    (selectErr: mysql.MysqlError, selectRes: any) => {
      if (selectErr) throw selectErr;

      if (selectRes) {
        connection.query(
          insertQuery,
          (insertErr: mysql.MysqlError, insertRes: any) => {
            if (insertErr) throw insertErr;

            if (insertRes) {
              res.send(insertRes);
            }
          }
        );
      } else {
        res.send({ status: 500, details: "aleady exists" });
      }
    }
  );
});

AuthRouter.post("/login", async (req: Request, res: Response) => {
  const uid = req.body.uid;
  const selectQuery = getUserSql({ userId: uid });
  // const members = await Member.findAll();
  // console.log("members: ", members);

  connection.query(selectQuery, (err: mysql.MysqlError, queryRes: any) => {
    if (err) throw err;

    if (queryRes) {
      const sessionTime = Number(process.env.NEXT_PUBLIC_SESSION_TIME) || 0;
      const token = getToken(queryRes);

      const expireDay = new Date(Date.now() + sessionTime);

      res.cookie("my-cookie", token, { expires: expireDay });

      if (queryRes) {
        res.send(queryRes);
      }
    }
  });
});

AuthRouter.post("/check", (req: Request, res: Response) => {
  const token = req.body.token;
  console.log("token: ", token);

  if (token) {
    const veriRes: any = verifyToken(token);
    console.log("veriRes: ", veriRes);
    const user_id = veriRes.data;
    const selectQuery = getUserSql({ userId: user_id });

    connection.query(selectQuery, (err: mysql.MysqlError, queryRes: any) => {
      if (err) throw err;

      if (queryRes) {
        res.send(veriRes);
      }
    });
  }
});

AuthRouter.post("/logout", (req: Request, res: Response) => {
  const userId = req.body.uid;

  res.clearCookie("my-cookie");
  res.send({ status: 200, details: `${userId} 로그아웃` });
});

module.exports = AuthRouter;
