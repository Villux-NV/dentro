const { Sequelize } = require('sequelize');

const { DB_CONNECTION_URI } = process.env;

const db = new Sequelize(DB_CONNECTION_URI, { logging: false });

module.exports = db;