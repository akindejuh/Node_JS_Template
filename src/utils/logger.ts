import { createLogger, transports, format } from 'winston';
import { EnvConfig } from './get-env';

const environment = EnvConfig.nodeEnv;
const logLevel = environment === 'development' ? 'debug' : 'warn';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
      ),
    }),
  ],
});

// Handle Exceptions
process.on('UnhandledRejection', error => {
  logger.error('Unhandled Rejection:', error);
});

process.on('UncaughtException', error => {
  logger.error('Uncaught Exception:', error);
});

export default logger;
