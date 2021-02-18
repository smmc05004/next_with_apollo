import next from "next";
import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import session from "express-session";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql from "mysql";
import url from "url";
import jwt from "jsonwebtoken";

dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "user1",
  password: "zxcv1234",
  database: "test",
  port: 3307,
  debug: true,
});

const expireTime = 604800000;

const dev = process.env.NODE_ENV !== "production";
const nextapp = next({ dev });
const handle = nextapp.getRequestHandler();

const port = 8080;

connection.connect();

nextapp
  .prepare()
  .then(() => {
    const app = express();
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // app.use(cookieParser(process.env.COOKIE_SECRET));
    // app.use(
    //   session({
    //     secret: `${process.env.SESSION_SECRET}`,
    //     resave: false,
    //     saveUninitialized: true,
    //   })
    // );

    // app.get("/users", (req: Request, res: Response) => {
    //   connection.query("SELECT * FROM user", (error, rows) => {
    //     if (error) throw error;
    //     res.send(rows);
    //   });
    // });

    app.post("/user", (req: Request, res: Response) => {
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

    app.post("/login", (req: Request, res: Response) => {
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

        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            data: queryRes[0].user_id,
          },
          "secret"
        );

        const expireDay = new Date(Date.now() + expireTime);

        res.cookie("my-cookie", token, { expires: expireDay });
        res.send(queryRes);
      });
    });

    app.post("/check", (req: Request, res: Response) => {
      const token = req.body.token;

      const veriRes: any = jwt.verify(token, "secret");

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

        // const expireDay = new Date(Date.now() + expireTime);
        if (queryRes && queryRes[0]) {
          console.log("queryRes: ", queryRes);
        }
        res.send(veriRes);
      });
    });

    app.post("/logout", (req: Request, res: Response) => {
      console.log("logtout start");
      const userId = req.body.uid;
      console.log("userId: ", userId);
      res.clearCookie("my-cookie");
      res.send({ status: 200 });
    });

    app.post("/post", (req: Request, res: Response) => {
      const { contents, deadline, userId } = req.body.post;

      const insertQuery = `
      INSERT INTO post
        (contents, deadline, user_id)
      VALUES
        ('${contents}', '${deadline}', '${userId}')
      `;

      connection.query(insertQuery, (err, queryRes) => {
        if (err) throw err;
        res.send(queryRes);
      });
    });

    app.get("/posts", (req: Request, res: Response) => {
      const queryData = url.parse(req.url, true).query;
      const userId = queryData.id;

      const selectQuery = `
      SELECT
        post_id as postId, contents, deadline, complete, user_id as userId
      FROM
        post
      WHERE
        user_id = '${userId}'
      AND
        uses = 'Y'
      `;
      connection.query(selectQuery, (err, queryRes) => {
        if (err) throw err;

        res.send(queryRes);
      });
    });

    app.put('/post', (req: Request, res: Response) => {
      const { id, status } = req.body;

      let completeFlag = 'y';

      if (status === 'y') {
        completeFlag = 'n';
      }

      const updateQuery = `
      UPDATE
        post
      SET
        complete = '${completeFlag}'
      WHERE
        (post_id = '${id}')
      `;

      connection.query(updateQuery, (err, queryRes) => {
        if (err) throw err;

        if (queryRes) {
          res.send({status: 200});
        }
      });
    });

    app.all("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex);
    process.exit(1);
  });
