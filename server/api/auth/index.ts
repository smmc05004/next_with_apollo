import express, { Request, Response } from 'express';
import { connection } from '../connection';
import { getToken, verifyToken } from './jwt';

const AuthRouter = express.Router();

AuthRouter.post("/user", (req: Request, res: Response) => {
  const user = req.body.user;
  const newName = user.name.replace(/(\s*)/g, "");

  const selectQuery = `
  SELECT
    * 
  FROM 
    user 
  WHERE 
    user_id = ${user.id}
  `;

  const insertQuery = `
  INSERT INTO user 
    (user_id, user_name)
  VALUES 
    ('${user.id}', '${newName}')
  `;

  connection.query(selectQuery, (selectErr, selectRes) => {
    if (selectErr) throw selectErr;

    if (selectRes && selectRes[0]) {
      res.send({ status: 500, details: "aleady exists" });
    } else {
      connection.query(insertQuery, (insertErr, insertRes) => {
        if (insertErr) throw insertErr;
        res.send(insertRes);
      });
    }
  });
});

AuthRouter.post("/login", (req: Request, res: Response) => {
  const uid = req.body.uid;

  const selectQuery = `
  SELECT
    *
  FROM
    user
  WHERE
    user_id = ${uid}
  `;

  connection.query(selectQuery, (err, queryRes) => {
    if (err) throw err;
    const sessionTime = Number(process.env.NEXT_PUBLIC_SESSION_TIME) || 0;
    const token = getToken(queryRes);

    const expireDay = new Date(Date.now() + sessionTime);

    res.cookie("my-cookie", token, { expires: expireDay });
    res.send(queryRes);
  });
});

AuthRouter.post("/check", (req: Request, res: Response) => {
  const token = req.body.token;

  if (token) {
    const veriRes: any = verifyToken(token);
  
    const user_id = veriRes.data;
  
    const selectQuery = `
    SELECT
      * 
    FROM 
      user 
    WHERE 
      user_id = ${user_id}
    `;
  
    connection.query(selectQuery, (err, queryRes) => {
      if (err) throw err;
  
      if (queryRes && queryRes[0]) {
  
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