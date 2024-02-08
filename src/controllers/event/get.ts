import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { relogRequestHandler } from '../../middleware/request-middleware';
import { Event } from '../../models/Event';

// Define Joi schema for validating request parameters
const getEventByIdSchema = Joi.object().keys({
    eventId: Joi.string().required() // Assuming eventId is a string
});

// Define the request handler to get event by ID
const getEventById: RequestHandler = async (req, res) => {
    try {
        const { eventId } = req.params; // Assuming eventId is passed in the URL params

        // Validate the request parameters
        const { error } = getEventByIdSchema.validate({ eventId });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Find the event by ID in the database
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // If the event is found, return it
        res.status(200).json(event.toJSON());
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the request handler
export const getById = relogRequestHandler(getEventById);
