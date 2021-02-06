import next from "next";
import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import session from "express-session";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
// import mysql
import mysql from "mysql";

dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "user1",
  password: "zxcv1234",
  database: "test",
  port: 3306,
  debug: true,
});

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

    app.get("/users", (req: Request, res: Response) => {
      // console.log("ENTER");
      console.log("req:", req.body);
      connection.query("SELECT * FROM user", (error, rows) => {
        if (error) throw error;
        res.send(rows);
      });
    });

    app.post("/user", (req: Request, res: Response) => {
      // console.log("set");
      // console.log("user: ", req.body.user);
      const user = req.body.user;
      const newName = user.name.replace(/(\s*)/g, "");
      const selectQuery = `SELECT * FROM user WHERE user_id = ${user.id}`;
      const insertQuery = `INSERT INTO user (user_id, user_name) VALUES ('${user.id}', '${newName}')`;

      connection.query(selectQuery, (selectErr, selectRes) => {
        if (selectErr) throw selectErr;
        console.log("selectRes: ", selectRes);
        console.log("selectRes[0]: ", selectRes[0]);

        if (selectRes && selectRes[0]) {
          console.log("aleady exists");
          res.send({ status: 500, details: "aleady exists" });
        } else {
          connection.query(insertQuery, (insertErr, insertRes) => {
            if (insertErr) throw insertErr;
            console.log("result: ", insertRes);
            res.send(insertRes);
          });
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
