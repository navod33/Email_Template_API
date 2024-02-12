import mongoose,{ Document, Model, Schema, model, Types } from 'mongoose';
import User, { IUser, UserSchema  } from './User';
import Company, { ICompany } from './Company';
import Event, { IEvent } from './Event';


  export interface ITemplate extends Document {
    name: string;
    event: Types.ObjectId | IEvent;
    company: Types.ObjectId | ICompany;
  }
  
  const TemplateSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Event.modelName
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Company.modelName
    },


  });
  
  export default mongoose.model<ITemplate>('Template', TemplateSchema);
  