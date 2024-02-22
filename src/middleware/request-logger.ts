import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
//console.log(req.method + " " + req.path + " - " + req.ip);
  next();
};

export default requestLogger;
