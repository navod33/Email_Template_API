import {
    Document, Model, Schema, model
  } from 'mongoose';
  
  export interface IEvent extends Document {
    eventName: string;
    CompanyName: string;
    eventData: Record<string, any>;
    userId: string;
  }
  
  interface IEventModel extends Model<IEvent> { }
  
  const schema = new Schema({
    userId: { type: String, required: true },
    eventName: { type: String, required: true },
    CompanyName: { type: String, required: true },
    eventData: { type: Object, required: true }
  });
  
  export const Event: IEventModel = model<IEvent, IEventModel>('Event', schema);
  