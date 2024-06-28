import { Request, Response } from 'express';
import AuthServices from '../../services/user/auth.services';
import {
  handleServerErrors,
  handleApiResponse,
} from '../../utils/api-response';

export class AuthController {
  // =============================================
  // Register user controller
  // =============================================
  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await new AuthServices().registerUserService(req.body);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
    }
  }

  // =============================================
  // User login controller
  // =============================================
  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await new AuthServices().loginUserService(req.body);
      handleApiResponse(res, result);
    } catch (error) {
      handleServerErrors(req, res, error);
    }
  }
}
