/**
 * Actual entry point for Web
 */

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import container from './container';
import Router from './router';

// Always use UTC Timezone
process.env.TZ = 'Etc/UTC';

// Config
const {
  config, log4js, socketIoService, errorHandler,
} = container;
const {
  hostUrl, port, environment, requestMaxSize,
} = config;
const { L } = container.defaultLogger('Application');

const app = express();

app.set('trust proxy', true);
app.set('view engine', 'jade');
app.use(helmet());
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true, limit: requestMaxSize }));
app.use(bodyParser.json({ limit: requestMaxSize }));
app.use(cookieParser());
app.use(compression({ level: 9 }));

app.use(log4js.connectLogger(L, { level: log4js.levels.INFO }));

app.use('/', Router(container)); // src/router
app.use(errorHandler.handleError);

// Initialize Webhook Queue
container.queueService.initialize();

const httpServer = http.createServer(app);
socketIoService.init(httpServer);

httpServer.listen(port, () => {
  L.info(`Server (${environment}) running at ${hostUrl}`);
});
