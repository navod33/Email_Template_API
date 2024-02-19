import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { relogRequestHandler } from '../middleware/request-middleware';
import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import Template, { ITemplate } from '../models/Template';

const addTemplate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    body('name')
        .notEmpty().withMessage('Event name is required')
        .isLength({ max: 1000 }).withMessage('Event name cannot exceed 1000 characters')
        .run(req);
    body('content')
        .notEmpty().withMessage('Event name is required')
        .isLength({ max: 1000 }).withMessage('Event name cannot exceed 1000 characters')
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { name, event, company, template } = req.body;

        const newTemplate: ITemplate = new Template({
            name,
            event,
            company,
            template
        });

        const savedTemplate  = await newTemplate.save();
        res.status(201).json(savedTemplate);
   
    } catch (error) {
        return res.status(500).json({ error });
    }
};



const updateTemplate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    body('name')
        .notEmpty().withMessage('Event name is required')
        .isLength({ max: 1000 }).withMessage('Event name cannot exceed 1000 characters')
        .run(req);
    body('content')
        .notEmpty().withMessage('Event name is required')
        .isLength({ max: 1000 }).withMessage('Event name cannot exceed 1000 characters')
        .run(req);

        const { templateId } = req.params;

        // Validate templateId from params
        const { error } = templateIdSchema.validate(templateId);
        if (error) {
            return res.status(400).json({ error: 'Invalid templateId' });
        } 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { name, event, company, template } = req.body;

        const updatedTemplate = await Template.findByIdAndUpdate(
            templateId, 
            {name, event, company, template},
            { new: true }
        )

if (!updatedTemplate) {
    return res.status(404).json({ error: 'Template not found' });
}
   
    } catch (error) {
        return res.status(500).json({ error });
    }
};



const templateIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required();

const getTemplate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {

          const { templateId } = req.params;
          // Validate templateId from params
          const { error } = templateIdSchema.validate(req.params.templateId);
          if (error) {
              return res.status(400).json({ error: 'Invalid templateId' });
          }
        
            const template = await Template.findById(templateId);

            if (!template) {
                return res.status(404).json({ error: 'Event not found' });
            }
    
            res.status(200).json(template.toJSON());
   
    } catch (error) {
        return res.status(500).json({ error });
    }
};


const deleteTemplate: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
          const { templateId } = req.params;
          // Validate templateId from params
          const { error } = templateIdSchema.validate(req.params.templateId);
          
          if (error) {
              return res.status(400).json({ error: 'Invalid templateId' });
          }
        
          const template = await Template.findByIdAndDelete(templateId);

            if (!template) {
                return res.status(404).json({ error: 'Event not found' });
            }
    
            res.status(200).json({ message: 'Template deleted successfully' });
   
    } catch (error) {
        return res.status(500).json({ error });
    }
};



export default { addTemplate,  getTemplate, deleteTemplate, updateTemplate};


