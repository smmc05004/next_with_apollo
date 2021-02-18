import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "user1",
  password: "zxcv1234",
  database: "test",
  port: 3307,
  debug: true,
});

connection.connect();

export { connection };