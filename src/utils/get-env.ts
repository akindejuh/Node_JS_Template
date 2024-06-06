import logger from './logger';

const getEnv = <T>(name: string): T => {
  const value = process.env[name];
  if (value === undefined || value === null) {
    logger.warn(`Environment variable ${name} is required!`);
  }
  return value as unknown as T;
};

export const EnvConfig = {
  serverUri: getEnv<string>('SERVER_PORT'),
  databaseUri: getEnv<string>('MONGODB_URI'),
  clientUrl: getEnv<string>('CLIENT_URL'),
  minPoolSize: getEnv<string>('MONGODB_MINPOOLSIZE'),
  maxPoolSize: getEnv<string>('MONGODB_MAXPOOLSIZE'),
  mailUser: getEnv<string>('MAIL_USER'),
  mailPassword: getEnv<string>('MAIL_PASSWORD'),
  JwtPrivateKey: getEnv<string>('JWT_PRIVATE_KEY'),
  JwtAuthExpiration: getEnv<string>('JWT_AUTH_EXPIRATION'),
  JwtResetPwdExpiration: getEnv<string>('JWT_RESET_PWD_EXPIRATION'),
  cloudinaryCloudName: getEnv<string>('cloudinaryCloudName'),
  cloudinaryApiKey: getEnv<string>('cloudinaryApiSecret'),
  cloudinaryApiSecret: getEnv<string>('cloudinaryApiSecret'),
  MulterFileSizeLimit: getEnv<number>('MULTER_FILE_SIZE_LIMIT'),
  ClientOrigin: getEnv<string>('CLIENT_ORIGIN'),
};
