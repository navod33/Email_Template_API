import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { validationResult } from 'express-validator';
import Company from '../models/Company';
import { relogRequestHandler } from '../middleware/request-middleware';

const eventSchema = Joi.object({
    name: Joi.string().required().max(100),
    logo: Joi.string().required(),
});

export const addCompany: RequestHandler = async (req, res, next) => {
    try {
        const { error } = eventSchema.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }
       const { name, logo } = req.body;
       const newCompany = new Company({ name, logo });
       const savedCompany = await newCompany.save();

       res.status(201).json(savedCompany);

    } catch (error) {
        console.error('Error adding/updating event:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const editCompany: RequestHandler = async (req, res) => {
    const companyId = req.params.id;
    try {
    const {name, logo } = req.body;
    
    const company = await Company.findById(companyId);

    if(!company){
        return res.status(404).json({ message: 'Company not found' });
    }
    if(name){
        company.name = name;
    }
    if(logo){
        company.logo = logo;
    }

    } catch (error) {
        console.error('Error fetching event by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { addCompany, editCompany };
