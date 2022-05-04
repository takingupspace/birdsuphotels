const mysql = require("mysql");
const dbConfig = require("../config/lsdm.db.config");

var lsdmconnection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = lsdmconnection;