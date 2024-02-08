import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { relogRequestHandler } from '../../middleware/request-middleware';
import { Event } from '../../models/Event';

export const addEventSchema = Joi.object().keys({
    eventName: Joi.string().required(),
    CompanyName: Joi.string().required(),
});

const addWrapper: RequestHandler = async (req, res) => {
  const { eventName, CompanyName, eventData } = req.body;
  const userId = req.userId;

  const event = new Event({  eventName, CompanyName, eventData  });
  await event.save();

  res.status(201).json(event.toJSON());
};

export const add = relogRequestHandler(addWrapper, { validation: { body: addEventSchema } });















// req.user?._id