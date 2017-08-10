const http = require('http');
const path = require('path');
const httpProxy = require('http-proxy');
const nodeStatic = require('node-static');

const config = require('./config/config');

const proxy = httpProxy.createProxyServer();
const servicesConf = config.services;
const servicesList = Object.keys(servicesConf);

const createUrl = (slug) =>
  `${servicesConf[slug].host || 'http://0.0.0.0'}:${servicesConf[slug].port}`;

const file = new nodeStatic.Server(path.join(__dirname, 'docs'));

http.createServer((req, res) => {
  const service = req.url.split('/')[1];

  if (servicesList.includes(service)) {
    return proxy.web(req, res, {target: createUrl(service)}, () => {
      res.statusCode = 500;
      return res.end(JSON.stringify({reason: 'Service not available'}));
    });
  }

  res.statusCode = 404;
  return res.end();
}).listen(process.env.port || 3000);

if (!process.env.prod) {
  http.createServer((req, res) => {
    req.addListener('end', () => {
      file.serve(req, res);
    }).resume();
  }).listen(3001);
}
