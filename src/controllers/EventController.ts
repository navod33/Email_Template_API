import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { validationResult } from 'express-validator';
import Event from '../models/Event';
import { relogRequestHandler } from '../middleware/request-middleware';

// Joi schema for validating request body
const eventSchema = Joi.object({
    name: Joi.string().required().max(1000),
    company: Joi.string().required(),
    user: Joi.string().required(),
    data: Joi.object().required() // You might need to adjust this schema based on your data structure
});

// Request handler to add an event
export const addEvent: RequestHandler = async (req, res, next) => {
    try {
        // Validate request body against schema
        const { error } = eventSchema.validate(req.body);
        if (error) {
            return res.status(422).json({ error: error.details[0].message });
        }

        const eventId = req.body._id;

        // Check if event with the given ID exists
        const existingEvent = eventId ? await Event.findById(eventId) : null;

        if (existingEvent) {
            // Update existing event if it exists
            existingEvent.data = req.body.data;
            await existingEvent.save();
            return res.status(200).json({ success: true, message: 'Event updated successfully' });
        } else {
            // Create a new event if ID is not provided or no event with the given ID exists
            const eventData = { ...req.body };
            const data = await Event.create(eventData);
            return res.status(201).json({ success: true, data });
        }
    } catch (error) {
        console.error('Error adding/updating event:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Request handler to get an event by ID
export const getEventById: RequestHandler = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Validate the event ID
        const { error } = Joi.string().required().validate(eventId);
        if (error) {
            return res.status(400).json({ error: 'Invalid event ID' });
        }

        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Return the event
        res.status(200).json(event.toJSON());
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the request handlers
export default { addEvent, getEventById };
