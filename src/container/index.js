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
import nexmo from 'nexmo';
import rateLimit from 'axios-rate-limit';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

import AuthenticationError from '../errors/authError';
import ForbiddenError from '../errors/forbiddenError';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';

import BlasterProcess from '../processes/blaster';

import NexmoService from '../services/nexmo';
import SocketIoService from '../services/socketIO';
import DatabaseService from '../services/database';
import HashService from '../services/hash';
import Base64Service from '../services/base64';
import AuthService from '../services/auth';
import PersistenceService from '../services/persistence';
import JwtService from '../services/jwt';
import TemplateService from '../services/template';
import RateLimiterService from '../services/rateLimiter';
import DateTimeService from '../services/datetime';

import Logger from '../services/logger';
import Authenticator from '../services/authenticator';
import Authorizer from '../services/authorizer';
import ControllerMapper from '../services/controllerMapper';
import ErrorHandler from '../services/errorHandler';

import config from './config';

const container = {};

// Configs
container.config = config;
container.config.hostUrl = container.config.customPort
  ? `${container.config.host}:${container.config.port}/`
  : `${container.config.host}/`;

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
container.nexmo = nexmo;
container.rateLimit = rateLimit;
container.moment = moment;
container.momentTimezone = momentTimezone;

// Errors
container.AuthenticationError = AuthenticationError;
container.NotFoundError = NotFoundError;
container.ForbiddenError = ForbiddenError;
container.BadRequestError = BadRequestError;

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
container.templateService = TemplateService(container);
container.rateLimiterService = RateLimiterService(container);
container.dateTimeService = DateTimeService(container);

// Process
container.blasterProcess = BlasterProcess(container);

export default container;
