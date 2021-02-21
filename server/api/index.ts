import express from "express";

const AuthRouter = require("./auth");
const PostRouter = require("./post");
const StockRouter = require("./stock");

const apiRouter = express.Router();

apiRouter.use("/auth", AuthRouter);
apiRouter.use("/post", PostRouter);
apiRouter.use("/stock", StockRouter);

module.exports = apiRouter;
