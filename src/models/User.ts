import mongoose, { Document, Model, Schema, model, Types } from 'mongoose';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import Company, { ICompany } from './Company';
export interface IUser extends Document {
  /** Email */
  email: string;
  /** Password */
  password: string;
  /** Password */
  firstName: string;
  /** Password */
  lastName: string;

  company: Types.ObjectId | ICompany;
  /** Created On */
  createdOn: Date;
  /** Created On */
  updatedOn: Date;
  encryptPassword: (password: string) => string;
  validPassword: (password: string) => boolean;
}

interface IUserModel extends Model<IUser> {}

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: Company.modelName
  },
  createdOn: {
    required: true,
    type: Date,
  },
  updatedOn: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.encryptPassword = function (password: string) {
  return hashSync(password, genSaltSync(10));
};

UserSchema.methods.validPassword = function (password: string) {
  return compareSync(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
