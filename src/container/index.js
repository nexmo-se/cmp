import fs from 'fs';
import path from 'path';
import express from 'express';
import axios from 'axios';
import httpStatus from 'http-status';
import socketIO from 'socket.io';
import log4js from 'log4js';
import Sequelize from 'sequelize';
import joi from 'joi';
import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import AuthenticationError from '../errors/authError';
import ForbiddenError from '../errors/forbiddenError';
import NotFoundError from '../errors/notFoundError';

import NexmoService from '../services/nexmo';
import SocketIoService from '../services/socketIO';
import DatabaseService from '../services/database';
import HashService from '../services/hash';
import Base64Service from '../services/base64';
import AuthService from '../services/auth';
import PersistenceService from '../services/persistence';
import JwtService from '../services/jwt';

import Logger from '../services/logger';
import Authenticator from '../services/authenticator';
import Authorizer from '../services/authorizer';
import ControllerMapper from '../services/controllerMapper';
import ErrorHandler from '../services/errorHandler';

import config from './config';

const container = {};

// Configs
container.config = config;

// External
container.fs = fs;
container.path = path;
container.express = express;
container.joi = joi;
container.axios = axios;
container.httpStatus = httpStatus;
container.socketIO = socketIO;
container.log4js = log4js;
container.logger = log4js.getLogger();
container.defaultLogger = Logger(container);
container.Sequelize = Sequelize;
container.uuid = uuid;
container.bcrypt = bcrypt;
container.jsonwebtoken = jsonwebtoken;

// Errors
container.AuthenticationError = AuthenticationError;
container.NotFoundError = NotFoundError;
container.ForbiddenError = ForbiddenError;

// Core Service
container.authenticator = Authenticator(container);
container.authorizer = Authorizer(container);
container.controllerMapper = ControllerMapper(container);
container.errorHandler = ErrorHandler(container);

// Internal
container.nexmoService = NexmoService(container);
container.socketIoService = SocketIoService(container);
container.databaseService = DatabaseService(container);
container.hashService = HashService(container);
container.jwtService = JwtService(container);
container.base64Service = Base64Service(container);
container.authService = AuthService(container);
container.persistenceService = PersistenceService(container);

export default container;
