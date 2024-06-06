import { createLogger, transports, format } from 'winston';
import { EnvConfig } from './get-env';

const environment = EnvConfig.nodeEnv;
const logLevel = environment === 'development' ? 'debug' : 'info';
console.log(EnvConfig.nodeEnv, logLevel);

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
      ),
    }),
  ],
});

process.on('UnhandledRejection', error => {
  logger.error('Unhandled Rejection:', error);
});

process.on('UncaughtException', error => {
  logger.error('Uncaught Exception:', error);
});

export default logger;
