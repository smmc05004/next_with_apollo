import next from "next";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port: number = 8080;

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(morgan("dev"));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(
      session({
        secret: `${process.env.SESSION_SECRET}`,
        resave: false,
        saveUninitialized: true,
      })
    );

    server.all("*", (req: express.Request, res: express.Response) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex);
    process.exit(1);
  });
