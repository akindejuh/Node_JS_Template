'use strict';
import { Router } from 'express';
import { UserController } from '../../controllers/user/user.controller';
import {
  LoginValidation,
  RegisterValidation,
} from '../../schemas/user/user.validation';
import { RequestValidator } from '../../middlewares/validator/validator';

export class UserRoutesV1 {
  private _router: Router;
  private userController: UserController;

  constructor() {
    this._router = Router();
    this.userController = new UserController();
    this.routes();
  }

  public get router(): Router {
    return this._router;
  }

  routes() {
    this.router.post(
      '/register',
      RequestValidator(RegisterValidation, 'body'),
      this.userController.registerUser,
    );
    this.router.post(
      '/login',
      RequestValidator(LoginValidation, 'body'),
      this.userController.loginUser,
    );
  }
}
