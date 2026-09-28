const mysql = require("mysql2/promise");

const isTiDB =
  Boolean(process.env.TIDB_HOST) &&
  Boolean(process.env.TIDB_USER) &&
  Boolean(process.env.TIDB_PASSWORD);

const db = mysql.createPool({
  host: process.env.TIDB_HOST || process.env.DB_HOST || "127.0.0.1",

  port: Number(
    process.env.TIDB_PORT ||
    process.env.DB_PORT ||
    3306
  ),

  user:
    process.env.TIDB_USER ||
    process.env.DB_USER ||
    "root",

  password:
    process.env.TIDB_PASSWORD ||
    process.env.DB_PASSWORD ||
    "",

  database:
    process.env.TIDB_DATABASE ||
    process.env.DB_NAME ||
    "s3_coworking",

  ssl: isTiDB
    ? {
        minVersion: "TLSv1.2",
      }
    : undefined,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;