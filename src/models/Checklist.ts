import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IChecklistItem {
    label: string;
    completed: boolean;
    completedAt?: Date;
}

export interface IChecklist extends Document {
    client: Types.ObjectId;
    listing?: Types.ObjectId; // Optional - can be generic checklist
    type: 'buying' | 'selling' | 'general';
    tourCompleted: boolean;
    tourCompletedAt?: Date;
    documentsSubmitted: boolean;
    documentsSubmittedAt?: Date;
    documentsVerified: boolean;
    documentsVerifiedAt?: Date;
    advancePaymentMade: boolean;
    advancePaymentMadeAt?: Date;
    offerMade: boolean;
    offerMadeAt?: Date;
    offerAccepted: boolean;
    offerAcceptedAt?: Date;
    customItems: IChecklistItem[];
    notes?: string;
    isIssued: boolean; // Whether checklist has been issued to client
    issuedBy?: Types.ObjectId; // Admin who issued the checklist
    issuedAt?: Date; // When checklist was issued
}

const ChecklistSchema: Schema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: false },
    type: { type: String, enum: ['buying', 'selling', 'general'], default: 'buying' },
    tourCompleted: { type: Boolean, default: false },
    tourCompletedAt: { type: Date },
    documentsSubmitted: { type: Boolean, default: false },
    documentsSubmittedAt: { type: Date },
    documentsVerified: { type: Boolean, default: false },
    documentsVerifiedAt: { type: Date },
    advancePaymentMade: { type: Boolean, default: false },
    advancePaymentMadeAt: { type: Date },
    offerMade: { type: Boolean, default: false },
    offerMadeAt: { type: Date },
    offerAccepted: { type: Boolean, default: false },
    offerAcceptedAt: { type: Date },
    customItems: [{
        label: { type: String, required: true },
        completed: { type: Boolean, default: false },
        completedAt: { type: Date },
    }],
    notes: { type: String },
    isIssued: { type: Boolean, default: false },
    issuedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    issuedAt: { type: Date },
}, { timestamps: true });

// Index for faster queries - allow one checklist of each type per client-listing combination
ChecklistSchema.index({ client: 1, listing: 1, type: 1 }, { sparse: true });
ChecklistSchema.index({ client: 1, type: 1 }); // Index for finding generic checklists

export default mongoose.models.Checklist || mongoose.model<IChecklist>('Checklist', ChecklistSchema);
