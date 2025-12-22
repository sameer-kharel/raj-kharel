import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/mongodb';
import DocumentSubmission from '@/models/DocumentSubmission';
import Listing from '@/models/Listing';
import User from '@/models/User';
import Checklist from '@/models/Checklist';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        // Try to get session for client access
        const session = await getServerSession(authOptions);

        await dbConnect();

        let documents;

        if (session && session.user) {
            // Client is logged in with NextAuth
            const user = await User.findOne({ email: session.user.email });
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            if (user.role === 'admin') {
                // Admin sees all documents
                documents = await DocumentSubmission.find()
                    .populate('client', 'name email image')
                    .populate('listing', 'title address')
                    .sort({ createdAt: -1 });
            } else {
                // Client sees only their documents
                documents = await DocumentSubmission.find({ client: user._id })
                    .populate('listing', 'title address')
                    .sort({ createdAt: -1 });
            }
        } else {
            // No session - assume admin panel access
            documents = await DocumentSubmission.find()
                .populate('client', 'name email image')
                .populate('listing', 'title address')
                .sort({ createdAt: -1 });
        }

        return NextResponse.json({ documents });
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            { error: 'Failed to fetch documents' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const listingId = formData.get('listingId') as string;
        const documentType = formData.get('documentType') as string;
        const notes = formData.get('notes') as string;

        if (!file || !documentType) {
            return NextResponse.json(
                { error: 'File and document type are required' },
                { status: 400 }
            );
        }

        // Check if listing exists if provided
        if (listingId) {
            const listing = await Listing.findById(listingId);
            if (!listing) {
                return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
            }
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'documents');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Generate unique filename
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${timestamp}_${sanitizedFileName}`;
        const filePath = path.join(uploadsDir, fileName);

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Create document submission
        const documentData: any = {
            client: user._id,
            documentType,
            fileName: file.name,
            fileUrl: `/uploads/documents/${fileName}`,
            fileSize: file.size,
            status: 'pending',
            notes,
        };

        if (listingId) {
            documentData.listing = listingId;
        }

        const document = await DocumentSubmission.create(documentData);

        // Update checklist only if listing is associated
        if (listingId) {
            const clientDocuments = await DocumentSubmission.find({
                client: user._id,
                listing: listingId,
            });

            if (clientDocuments.length > 0) {
                await Checklist.findOneAndUpdate(
                    { client: user._id, listing: listingId },
                    {
                        documentsSubmitted: true,
                        documentsSubmittedAt: new Date(),
                    },
                    { upsert: true }
                );
            }
        }

        const populatedDocument = await DocumentSubmission.findById(document._id)
            .populate('listing', 'title address');

        return NextResponse.json({ document: populatedDocument }, { status: 201 });
    } catch (error) {
        console.error('Error uploading document:', error);
        return NextResponse.json(
            { error: 'Failed to upload document' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Only admin can verify/reject documents
        if (user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { documentId, status, rejectionReason } = await request.json();

        if (!documentId || !status) {
            return NextResponse.json(
                { error: 'Document ID and status are required' },
                { status: 400 }
            );
        }

        const document = await DocumentSubmission.findById(documentId);
        if (!document) {
            return NextResponse.json({ error: 'Document not found' }, { status: 404 });
        }

        document.status = status;
        if (status === 'verified') {
            document.verifiedBy = user._id;
            document.verifiedAt = new Date();
        } else if (status === 'rejected') {
            document.rejectionReason = rejectionReason;
        }

        await document.save();

        // Update checklist if all documents are verified
        if (status === 'verified') {
            const allDocuments = await DocumentSubmission.find({
                client: document.client,
                listing: document.listing,
            });

            const allVerified = allDocuments.every(doc => doc.status === 'verified');

            if (allVerified) {
                await Checklist.findOneAndUpdate(
                    { client: document.client, listing: document.listing },
                    {
                        documentsVerified: true,
                        documentsVerifiedAt: new Date(),
                    },
                    { upsert: true }
                );
            }
        }

        const populatedDocument = await DocumentSubmission.findById(document._id)
            .populate('client', 'name email image')
            .populate('listing', 'title address')
            .populate('verifiedBy', 'name');

        return NextResponse.json({ document: populatedDocument });
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json(
            { error: 'Failed to update document' },
            { status: 500 }
        );
    }
}
