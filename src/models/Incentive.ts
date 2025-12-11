import mongoose, { Schema, Document } from 'mongoose';

export interface IIncentive extends Document {
    title: string;
    description: string;
    type: 'charity' | 'discount' | 'bonus' | 'other';
    amount?: number;
    isActive: boolean;
    startDate: Date;
    endDate?: Date;
    termsAndConditions: string;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

const IncentiveSchema = new Schema<IIncentive>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['charity', 'discount', 'bonus', 'other'],
            required: true,
        },
        amount: {
            type: Number,
            min: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
        termsAndConditions: {
            type: String,
            default: '',
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Incentive || mongoose.model<IIncentive>('Incentive', IncentiveSchema);
