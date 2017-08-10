const Sequelize = require('sequelize');

const config = require('./config');
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password,
  {dialect: 'postgres', host: config.db.host, port: config.db.port});

module.exports.AdminUsers = sequelize.define('admin-users', {
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

sequelize.sync().then(() => console.log('Database connected.'));
