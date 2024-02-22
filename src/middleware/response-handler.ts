import { NextFunction, Request, Response } from 'express';

interface CustomResponse extends Response {
  sendSuccess: (data: any, message?: string | null) => void;
  sendError: (error: any, errorCode?: number, errorData?: any) => void;
}

export function ResponseHandler(req: Request, res: CustomResponse, next: NextFunction) {
  res.sendSuccess = (data: any, message: string | null = null) => {
    res.send({ success: true, data: data, message: message });
  };

  res.sendError = (error: any, errorCode = 0, errorData: any = undefined) => {
    if (typeof error === 'string') {
      res.send({ success: false, error: error, errorCode: errorCode, errorData });
    } else {
      if (!error) {
        error = { stack: null, message: "Unknown Error" };
      }
      console.error(error.stack); 
      res.send({ success: false, error: error.message, errorData: error, errorCode: errorCode });
    }
  };

  next();
}


export default ResponseHandler;
