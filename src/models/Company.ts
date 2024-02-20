import mongoose,{ Document, Model, Schema, model, Types } from 'mongoose';
import User, { IUser } from './User';
  
  export interface ICompany extends Document {
    name: string;
    logo:string;
  }
  
  const CompanySchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    logo: {
      type: mongoose.Schema.Types.String,
      required: true
  },

  });

  export default mongoose.model<ICompany>('Company', CompanySchema);
  