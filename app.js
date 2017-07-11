const Koa = require('koa');
const serve = require('koa-static-server');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');

const routes = require('./routes')

const app = new Koa();

app.use(serve({rootDir: 'static', rootPath:'/static'}))
app.use(cors())
app.use(bodyParser())
app.use(json())
app.use(routes)

module.exports = app.callback();
