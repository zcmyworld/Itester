let config = require('../Configs');
let Promise = require('bluebird');
let mysql = Promise.promisifyAll(require('mysql'));

module.exports = Promise.promisifyAll(
  mysql.createPool({
    host: config.db.mysql.host,
    port: config.db.mysql.port,
    user: config.db.mysql.user,
    password: config.db.mysql.password,
    database: config.db.mysql.database
  })
);
