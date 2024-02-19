import mongoose, { Document, Schema, Types } from 'mongoose';
import Event, { IEvent } from './Event';
import Company, { ICompany } from './Company';

interface TemplateItemProperty<T> {
    name: string;
    value: T;
}

interface TemplateItem {
    type: string;
    properties: TemplateItemProperty<any>[]; 
}

export interface ITemplate extends Document {
    name: string;
    event: Types.ObjectId | IEvent;
    company: Types.ObjectId | ICompany;
    template: TemplateItem[];
}

const TemplateItemPropertySchema = new Schema({
    name: String,
    value: Schema.Types.Mixed
});

const TemplateItemSchema = new Schema({
    type: String,
    properties: [TemplateItemPropertySchema] 
});

const TemplateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: Schema.Types.Mixed,
        required: false
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Event.modelName
    },
    company: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Company.modelName
    },
    template: {
        type: [TemplateItemSchema],
        required: true
    },
});

export default mongoose.model<ITemplate>('Template', TemplateSchema);

