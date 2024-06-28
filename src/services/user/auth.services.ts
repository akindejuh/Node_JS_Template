import { Auth } from '../../models/user/auth.model';
import { Profile } from '../../models/user/profile.model';
import { bcryptHasher } from '../../utils/bcrypt';
import { ApiServiceResponse } from '../../utils/api-response';
import logger from '../../utils/logger';
import { authResFactory } from '../../utils/auth-res-factory';
import { startTransaction } from '../../database/db-transaction';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../dtos/user/auth.dto';

export default class AuthServices {
  // =============================================
  // Register new user
  // =============================================
  public async registerUserService(
    user: RegisterRequest,
  ): Promise<ApiServiceResponse<{ token: string; user: AuthResponse }>> {
    const { email, password, user_name } = user;

    const existing_mail = await Auth.findOne({ email: email });

    if (existing_mail !== null) {
      return { status: 400, msg: 'Existing/Invalid credentials' };
    }

    let payload;
    let new_user;
    let profile;

    await startTransaction(async session => {
      new_user = await Auth.create(
        [{ email, password: await bcryptHasher.hashPasswordHandler(password) }],
        { session },
      );

      profile = await Profile.create([{ user: new_user[0]._id, user_name }], {
        session,
      });

      payload = {
        user_id: new_user[0]._id.toString(),
      };
    });

    const { status, data } = await authResFactory(
      // @ts-expect-error dbSession
      payload,
      new_user?.[0],
      profile?.[0],
    );
    return { status, data };
  }

  // =============================================
  // User login
  // =============================================
  public async loginUserService(
    user: LoginRequest,
  ): Promise<ApiServiceResponse<{ token: string; user: AuthResponse }>> {
    const { email, password } = user;

    const check_user = await Auth.findOne({ email });
    if (check_user === null) {
      return { status: 401, msg: 'Invalid credentials' };
    }

    const user_profile = await Profile.findOne({
      user: check_user._id,
    });

    if (user_profile === null) {
      logger.warn('User profile not found');
      return {
        status: 401,
        msg: 'You cannot login at the moment, please contact an admin!',
      };
    }

    const is_password_match = await bcryptHasher.comparePassword(
      password,
      check_user?.password,
    );

    if (!is_password_match) {
      return { status: 400, msg: 'Invalid credentials' };
    }

    const { status, data } = await authResFactory(
      { user_id: check_user._id.toString() },
      check_user,
      user_profile,
    );
    return { status, data };
  }
}