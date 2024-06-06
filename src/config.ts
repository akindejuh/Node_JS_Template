import { EnvConfig } from './utils/get-env';

export const db = {
  uri: EnvConfig.databaseUri,
  minPoolSize: parseInt(EnvConfig.minPoolSize),
  maxPoolSize: parseInt(EnvConfig.maxPoolSize),
}

export const nodemailerConfig = {
  user: EnvConfig.mailUser,
  password: EnvConfig.mailPassword,
}

export const cloudinaryConfig = {
  cloud_name: EnvConfig.cloudinaryCloudName,
  api_key: EnvConfig.cloudinaryApiKey,
  api_secret: EnvConfig.cloudinaryApiSecret,
}