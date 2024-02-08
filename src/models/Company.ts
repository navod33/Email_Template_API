import mongoose,{ Document, Model, Schema, model, Types } from 'mongoose';
import User, { IUser } from './User';
  
  export interface ICompany extends Document {
    name: string;
    // user: Types.ObjectId | IUser;
  }
  
  const CompanySchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: User.modelName
    // },

  });

  export default mongoose.model<ICompany>('Company', CompanySchema);
  