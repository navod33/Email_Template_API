import mongoose,{ Document, Model, Schema, model, Types } from 'mongoose';
import User, { IUser, UserSchema  } from './User';
import Company, { ICompany } from './Company';

  export interface IEvent extends Document {
    name: string;
    company: Types.ObjectId | ICompany;
    user: Types.ObjectId | IUser;
    data: Record<string, any>;
  }
  
  interface IEventModel extends Model<IEvent> { }
  
  const EventSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: Company.modelName
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User.modelName
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
  });
  
//   export const Event: IEventModel = model<IEvent, IEventModel>('Event', schema);
  export default mongoose.model<IEvent>('Event', EventSchema);
  