import { Request, Response, NextFunction } from 'express';

export function errorHandler ( err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack); 

  return res.status(500).json({ message: 'Internal Server Error' });
  next();
};

// export default errorHandler;
