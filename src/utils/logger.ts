import { createLogger, transports, format } from 'winston';

const environment = process.env.NODE_ENV;
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
