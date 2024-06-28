import { IProfile, IAuth } from '../../interfaces/user';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest extends LoginRequest {
  user_name: string;
}

export class AuthResponse {
  user_id?: string;
  email?: string;
  user_name?: string;

  static createResponse(auth: IAuth, profile: IProfile): AuthResponse {
    return {
      email: auth.email,
      user_id: auth._id.toString(),
      user_name: profile.user_name,
    };
  }
}
