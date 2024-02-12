import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { relogRequestHandler } from '../../middleware/request-middleware';
import Event from '../../models/Event';
import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const addEvent: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    body('name').notEmpty().withMessage('Event name is required').run(req);
    // body('lastName').notEmpty().withMessage('Last name is required').run(req);
    // body('message').notEmpty().withMessage('Message is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const eventId = req.body._id;

    try {
        let eventData = { 
            name: req.body.name,
            company: req.body.company,
            user: req.body.user,
            data: req.body.data,
        };

        // Check if event with same key attributes exists
        // const existingEvent = await Event.findOne({
        //     name: eventData.name,
        //     company: eventData.company,
        //     user: eventData.user
        // });

        // Check if event with the given event_id exists
         const existingEvent = await Event.findById(eventId);

        if (existingEvent) {
            // If event with same key attributes exists, update data only if it's different
            if (JSON.stringify(existingEvent.data) !== JSON.stringify(eventData.data)) {
                existingEvent.data = eventData.data;
                await existingEvent.save();
            }
            return res.status(200).json({ success: true, message: 'Event updated successfully' });
        } else {
            // If no event with same key attributes exists, create a new event
            const data = await Event.create(eventData);
            return res.status(201).json({ success: true, data });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { addEvent };
