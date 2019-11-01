import express from 'express';
import axios from 'axios';
import httpStatus from 'http-status';
import socketIO from 'socket.io';
import log4js from 'log4js';
import Sequelize from 'sequelize';

import NexmoService from '../services/nexmo';
import SocketIoService from '../services/socketIO';
import DatabaseService from '../services/database';

import Logger from '../services/logger';
import ErrorHandler from '../services/errorHandler';

import config from './config';

const container = {};

// Configs
container.config = config;

// External
container.express = express;
container.axios = axios;
container.httpStatus = httpStatus;
container.socketIO = socketIO;
container.log4js = log4js;
container.logger = log4js.getLogger();
container.defaultLogger = Logger(container);
container.Sequelize = Sequelize;

// Core Service
container.errorHandler = ErrorHandler(container);

// Internal
container.nexmoService = NexmoService(container);
container.socketIoService = SocketIoService(container);
container.databaseService = DatabaseService(container);

export default container;
