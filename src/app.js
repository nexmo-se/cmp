import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import container from './container';
import Router from './router';

// Always use Singapore Timezone
process.env.TZ = 'Asia/Singapore';

const app = express();

app.set('trust proxy', true);
app.set('view engine', 'jade');
app.use(helmet());
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression({ level: 9 }));

app.use('/', Router(container));
app.use(container.errorHandler.notFound);
app.use(container.errorHandler.generic);

const httpServer = http.createServer(app);
container.socketIoService.init(httpServer);
const { L } = container.defaultLogger('App.js');

const { host, port, environment } = container.config;
httpServer.listen(port, () => {
  L.info(`Server (${environment}) running at ${host}:${port}`);
});
