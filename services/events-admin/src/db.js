const Sequelize = require('sequelize');

const config = require('./config');
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password,
  {dialect: 'postgres', host: config.db.host, port: config.db.port});

module.exports.Events = sequelize.define('events', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  host_id: Sequelize.INTEGER
});

sequelize.sync().then(() => console.log('Database connected.'));
