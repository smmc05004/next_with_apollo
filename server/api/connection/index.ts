import mysql from "mysql";

const host = process.env.NEXT_PUBLIC_HOST;
const user = String(process.env.NEXT_PUBLIC_USER);
const password = String(process.env.NEXT_PUBLIC_PASSWORD);
const DB = process.env.NEXT_PUBLIC_DB;
const Port = Number(process.env.NEXT_PUBLIC_PORT);

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: DB,
  port: Port,
  debug: true,
});

connection.connect();

export { connection };