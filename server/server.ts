import next from "next";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "../schemas";
import resolvers from "../resolvers";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextapp = next({ dev });
const handle = nextapp.getRequestHandler();

const apiRouter = require("./api");

// const typeDefs = gql`
//   type Query {
//     ping: String
//   }
// `;

nextapp
  .prepare()
  .then(() => {
    const port = 8080;
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // app.use(cookieParser());
    // app.use(
    //   session({
    //     secret: `${process.env.SESSION_SECRET}`,
    //     resave: false,
    //     saveUninitialized: true,
    //   })
    // );

    app.use("/api", apiRouter);

    const apolloServer = new ApolloServer({
      typeDefs: schema,
      resolvers,
    });

    apolloServer.applyMiddleware({
      app,
      path: "/graphql",
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
