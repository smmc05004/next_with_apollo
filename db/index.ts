import { Sequelize } from "sequelize";
import config from "./config";

const sequelize = new Sequelize(
  config.database as string,
  config.username as string,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

if (process.env.NODE_ENV !== "test") {
  sequelize.sync();
}

export default sequelize;
