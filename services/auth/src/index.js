const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');


require('koa-validate')(app);
app.use(bodyParser());

const config = require('./config');
const router = require('./router');

app.use(cors());
app.use(router.routes());
app.listen(config.port);
