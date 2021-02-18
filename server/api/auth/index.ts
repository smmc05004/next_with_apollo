import express, { Request, Response } from 'express';
import mysql from 'mysql';
import { connection } from '../../db/connection';
import { getToken, verifyToken } from './jwt';
import { getUserSql, addUserSql } from '../../db/query';

const AuthRouter = express.Router();

AuthRouter.post("/user", async (req: Request, res: Response) => {
  const user = req.body.user;
  const newName = user.name.replace(/(\s*)/g, "");
  const selectQuery = getUserSql({userId: user.id});
  const insertQuery = addUserSql({userId: user.id, newName: newName});

  const checkQueryResult = await connection.query(selectQuery, (selectErr: mysql.MysqlError, selectRes: any): mysql.queryCallback => {
    if (selectErr) throw selectErr;

    return selectRes;
  });

  if (checkQueryResult) {
    const insertQueryResult = await connection.query(insertQuery, (insertErr: mysql.MysqlError, insertRes: any): mysql.queryCallback => {
      if (insertErr) throw insertErr;

      return insertRes;
    });
    if (insertQueryResult) {
      console.log('insertQueryResult: ', JSON.stringify(insertQueryResult));
      res.send(insertQueryResult);
    }
  } else {
    res.send({ status: 500, details: "aleady exists" });
  };

});

AuthRouter.post("/login", async (req: Request, res: Response) => {
  const uid = req.body.uid;
  const selectQuery = getUserSql(uid);

  const queryResult = await connection.query(selectQuery, (err: mysql.MysqlError, queryRes: any): mysql.queryCallback => {
    if (err) throw err;
    const sessionTime = Number(process.env.NEXT_PUBLIC_SESSION_TIME) || 0;
    const token = getToken(queryRes);

    const expireDay = new Date(Date.now() + sessionTime);

    res.cookie("my-cookie", token, { expires: expireDay });

    return queryRes;
  });

  if (queryResult) {
    res.send(queryResult);
  }
});

AuthRouter.post("/check", async (req: Request, res: Response) => {
  const token = req.body.token;

  if (token) {
    const veriRes: any = verifyToken(token);
    const user_id = veriRes.data;
    const selectQuery = getUserSql({userId: user_id});
  
    const queryResult = await connection.query(selectQuery, (err: mysql.MysqlError, queryRes: any): mysql.queryCallback => {

      if (err) throw err;
  
      if (queryRes) {
        return queryRes;
      } else {
        return err;
      }
    });

    if (queryResult) {
      res.send(veriRes);
    }
  }
});

AuthRouter.post("/logout", (req: Request, res: Response) => {
  const userId = req.body.uid;

  res.clearCookie("my-cookie");
  res.send({ status: 200, details: `${userId} 로그아웃` });
});


module.exports = AuthRouter;