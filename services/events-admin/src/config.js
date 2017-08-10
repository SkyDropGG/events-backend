module.exports = {
  port: 3003,
  services: {
    auth: 'http://0.0.0.0:3002'
  },
  db: {
    host: 'localhost',
    database: 'postgres',
    username: 'postgres',
    password: 1
  }
};
