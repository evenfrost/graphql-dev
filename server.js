const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const { makeExecutableSchema } = require('graphql-tools');

const PORT = 3300;
const GRAPHQL_ENDPOINT = '/graphql';

const app = new Koa();
const router = new Router();

const schema = {};

app.use(logger());
app.use(bodyParser());

router.get(GRAPHQL_ENDPOINT, graphqlKoa({ schema }));
router.post(GRAPHQL_ENDPOINT, graphqlKoa({ schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: GRAPHQL_ENDPOINT }));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
