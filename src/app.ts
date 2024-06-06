/**
 *
 * @author alob-mtc
 * modified by @author gbenga2540
 *
 */

'use strict';
import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import { createServer } from 'http';

import logger from './utils/logger';
import './database'; // initialized database
import { EnvConfig } from './utils/get-env';
import { setupRoutes } from './routes';

const app: Application = express();
const server = createServer(app);
const port = EnvConfig.serverPort || 5000;

// ==============================================
// Routes API's
// ==============================================
setupRoutes(app);

// Express server error
const serverError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error;
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCESS':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(`${bind}, is already in use!`);
      process.exit(1);
    default:
      throw error;
  }
};

// ==============================================
// Server implt.
// ==============================================
server.listen(port);
server.on('error', serverError);
server.on('listening', () => {
  logger.info(`Server listening on port ${port}`);
});
