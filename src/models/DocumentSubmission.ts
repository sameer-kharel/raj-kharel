import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDocumentSubmission extends Document {
    client: Types.ObjectId;
    listing?: Types.ObjectId;
    documentType: 'id_proof' | 'income_proof' | 'pre_approval' | 'bank_statement' | 'other';
    fileName: string;
    fileUrl: string;
    fileSize: number;
    status: 'pending' | 'verified' | 'rejected';
    verifiedBy?: Types.ObjectId;
    verifiedAt?: Date;
    rejectionReason?: string;
    notes?: string;
}

const DocumentSubmissionSchema: Schema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: false },
    documentType: {
        type: String,
        enum: ['id_proof', 'income_proof', 'pre_approval', 'bank_statement', 'other'],
        required: true
    },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    rejectionReason: { type: String },
    notes: { type: String },
}, { timestamps: true });

// Index for faster queries
DocumentSubmissionSchema.index({ client: 1, listing: 1 });
DocumentSubmissionSchema.index({ status: 1 });

export default mongoose.models.DocumentSubmission || mongoose.model<IDocumentSubmission>('DocumentSubmission', DocumentSubmissionSchema);
