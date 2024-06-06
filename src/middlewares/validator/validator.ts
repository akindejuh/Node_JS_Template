import { Request, Response, NextFunction } from 'express';

type ISource = 'body' | 'params' | 'query';

export const RequestValidator = (validation: any, source: ISource) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let reqData = {};

    if (source === 'body') {
      reqData = req.body;
    } else if (source === 'query') {
      reqData = req.query;
    } else {
      reqData = req.params;
    }

    const { error } = validation.validate(reqData, {
      abortEarly: false,
    });
    if (error !== undefined) {
      return res.status(400).json({ msg: error.message });
    }
    next();
  };
};
