import next from "next";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextapp = next({ dev });
const handle = nextapp.getRequestHandler();

const apiRouter = require("./api");

nextapp
  .prepare()
  .then(() => {
    const port = 8080;
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

    app.use("/api", apiRouter);

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
