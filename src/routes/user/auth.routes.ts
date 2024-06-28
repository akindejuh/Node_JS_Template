'use strict';
import { Router } from 'express';
import { AuthController } from '../../controllers/user/auth.controller';
import {
  LoginValidation,
  RegisterValidation,
} from '../../schemas/user/auth.validation';
import { RequestValidator } from '../../middlewares/validator/validator';

export class AuthRoutesV1 {
  private _router: Router;
  private authController: AuthController;

  constructor() {
    this._router = Router();
    this.authController = new AuthController();
    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  routes() {
    this.router.post(
      '/register',
      RequestValidator(RegisterValidation, 'body'),
      this.authController.registerUser,
    );
    this.router.post(
      '/login',
      RequestValidator(LoginValidation, 'body'),
      this.authController.loginUser,
    );
  }
}
