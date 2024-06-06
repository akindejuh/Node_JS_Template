import jwt, {
  GetPublicKeyOrSecret,
  Secret,
  SignOptions,
  JwtPayload,
} from 'jsonwebtoken';
import logger from './logger';
import { Types } from 'mongoose';
import { EnvConfig } from './get-env';

export interface MyJwtPayload extends JwtPayload {
  user_id: Types.ObjectId;
}

export const signJwt = (
  payload: Object,
  duration: string,
  options: SignOptions = {},
) => {
  try {
    const privateKey = EnvConfig.JwtPrivateKey;
    return jwt.sign(payload, String(privateKey), {
      ...options,
      expiresIn: duration,
    });
  } catch (error) {
    logger.error(error);
    return;
  }
};

export const verifyJwt = (token: string) => {
  try {
    // @ts-ignore
    const publicKey: Secret | GetPublicKeyOrSecret | string =
      EnvConfig.JwtPrivateKey;
    return jwt.verify(token, publicKey);
  } catch (error) {
    return { status: 401, error };
  }
};
