/**
 * Dependency Injection Container/ServiceLocator
 */

import fs from 'fs';
import readline from 'readline';
import NReadLines from 'n-readlines';
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
import Bottleneck from 'bottleneck';
import multer from 'multer';
import csvParse from 'csv-parse/lib/sync';
import csvtojson from 'csvtojson';
import arraytocsv from 'convert-array-to-csv';

import AuthenticationError from '../errors/authError';
import ForbiddenError from '../errors/forbiddenError';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';

import BlasterProcess from '../processes/blaster';
import PickerProcess from '../processes/picker';
import ReportProcess from '../processes/report';

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
import FileService from '../services/file';
import CsvService from '../services/csv';
import ReportService from '../services/report';
import QueueService from '../services/queue';
import WebhookService from '../services/webhook';

import Logger from '../services/logger';
import Authenticator from '../services/authenticator';
import Authorizer from '../services/authorizer';
import ControllerMapper from '../services/controllerMapper';
import ErrorHandler from '../services/errorHandler';

import config from './config';

const container = {};

// Configs
container.config = config;
container.config.hostUrl = `${container.config.accessHost}:${container.config.accessPort}/`;

// External
container.fs = fs;
container.readline = readline;
container.NReadLines = NReadLines;
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
container.Bottleneck = Bottleneck;
container.multer = multer;
container.csvParse = csvParse;
container.csvtojson = csvtojson;
container.arraytocsv = arraytocsv;

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
container.fileService = FileService(container);
container.csvService = CsvService(container);
container.reportService = ReportService(container);
container.queueService = QueueService(container);
container.webhookService = WebhookService(container);

// Process
container.blasterProcess = BlasterProcess(container);
container.pickerProcess = PickerProcess(container);
container.reportProcess = ReportProcess(container);

export default container;
