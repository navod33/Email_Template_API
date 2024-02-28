import { Request, Response, NextFunction } from 'express';
import Company, { ICompany } from '../models/Company';

declare module 'express' {
    interface Request {
        company?: ICompany; 
    }
}

export async function  checkCompanyExists(req: Request, res: Response, next: NextFunction) {
    const companyId = req.params.id;
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        req.company = company;
        next();
    } catch (error) {
        console.error('Error checking company existence:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    next();
};




