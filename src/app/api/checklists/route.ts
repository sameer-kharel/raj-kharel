import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/mongodb';
import Checklist from '@/models/Checklist';
import User from '@/models/User';

export async function GET(request: NextRequest) {
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

        const { searchParams } = new URL(request.url);
        const listingId = searchParams.get('listingId');
        const type = searchParams.get('type') || 'general';

        let checklist;

        if (user.role === 'admin') {
            const clientId = searchParams.get('clientId');

            if (!clientId) {
                // Return all checklists if no generic client specified
                // We might want to filter or paginate, but for now return all
                const checklists = await Checklist.find()
                    .populate('client', 'name email image')
                    .populate('listing', 'title address')
                    .sort({ createdAt: -1 });

                return NextResponse.json({ checklists });
            }

            const query: any = { client: clientId };
            if (listingId) query.listing = listingId;
            else query.type = type;

            checklist = await Checklist.findOne(query)
                .populate('client', 'name email')
                .populate('listing', 'title address');
        } else {
            // Clients can only see issued checklists
            const query: any = { client: user._id, isIssued: true };
            if (listingId) query.listing = listingId;
            else query.type = type;

            checklist = await Checklist.findOne(query)
                .populate('listing', 'title address')
                .populate('issuedBy', 'name');
        }



        if (!checklist) {
            // Return default checklist structure if none exists (for transient UI)
            return NextResponse.json({
                checklist: {
                    tourCompleted: false,
                    documentsSubmitted: false,
                    documentsVerified: false,
                    advancePaymentMade: false,
                    offerMade: false,
                    offerAccepted: false,
                    customItems: []
                }
            });
        }

        return NextResponse.json({ checklist });
    } catch (error) {
        console.error('Error fetching checklist:', error);
        return NextResponse.json(
            { error: 'Failed to fetch checklist' },
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

        // Only admin can create checklists
        if (user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { clientId, listingId, type, customItems, notes, issueNow, userName, userPhone } = await request.json();

        let targetClientId = clientId;

        if (!targetClientId) {
            if (userName && userPhone) {
                // Create a placeholder user
                const placeholderUser = await User.create({
                    name: userName,
                    phone: userPhone,
                    role: 'client',
                    isPlaceholder: true,
                });
                targetClientId = placeholderUser._id;
            } else {
                return NextResponse.json(
                    { error: 'Client ID or Name/Phone is required' },
                    { status: 400 }
                );
            }
        }

        // Verify client exists
        const client = await User.findById(targetClientId);
        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        const checklistData: any = {
            client: targetClientId,
            type: type || 'general',
            customItems: customItems || [],
            notes,
        };

        if (listingId) {
            checklistData.listing = listingId;
        }

        // If issueNow is true, mark as issued immediately
        if (issueNow) {
            checklistData.isIssued = true;
            checklistData.issuedBy = user._id;
            checklistData.issuedAt = new Date();
        }

        const checklist = await Checklist.create(checklistData);

        const populatedChecklist = await Checklist.findById(checklist._id)
            .populate('client', 'name email image')
            .populate('listing', 'title address')
            .populate('issuedBy', 'name');

        return NextResponse.json({ checklist: populatedChecklist }, { status: 201 });
    } catch (error) {
        console.error('Error creating checklist:', error);
        return NextResponse.json(
            { error: 'Failed to create checklist' },
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

        // Only admin can update checklist
        if (user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { clientId, listingId, type, updates } = await request.json();

        if (!clientId || (!listingId && !type) || !updates) {
            return NextResponse.json(
                { error: 'Client ID, listing ID (or type), and updates are required' },
                { status: 400 }
            );
        }

        const updateData: any = {};

        if (updates.tourCompleted !== undefined) {
            updateData.tourCompleted = updates.tourCompleted;
            if (updates.tourCompleted) {
                updateData.tourCompletedAt = new Date();
            }
        }

        if (updates.documentsSubmitted !== undefined) {
            updateData.documentsSubmitted = updates.documentsSubmitted;
            if (updates.documentsSubmitted) {
                updateData.documentsSubmittedAt = new Date();
            }
        }

        if (updates.documentsVerified !== undefined) {
            updateData.documentsVerified = updates.documentsVerified;
            if (updates.documentsVerified) {
                updateData.documentsVerifiedAt = new Date();
            }
        }

        if (updates.advancePaymentMade !== undefined) {
            updateData.advancePaymentMade = updates.advancePaymentMade;
            if (updates.advancePaymentMade) {
                updateData.advancePaymentMadeAt = new Date();
            }
        }

        if (updates.offerMade !== undefined) {
            updateData.offerMade = updates.offerMade;
            if (updates.offerMade) {
                updateData.offerMadeAt = new Date();
            }
        }

        if (updates.offerAccepted !== undefined) {
            updateData.offerAccepted = updates.offerAccepted;
            if (updates.offerAccepted) {
                updateData.offerAcceptedAt = new Date();
            }
        }

        if (updates.customItems) {
            updateData.customItems = updates.customItems;
        }

        if (updates.notes !== undefined) {
            updateData.notes = updates.notes;
        }

        // Handle issuance
        if (updates.isIssued !== undefined) {
            updateData.isIssued = updates.isIssued;
            if (updates.isIssued && !updateData.issuedAt) {
                updateData.issuedBy = user._id;
                updateData.issuedAt = new Date();
            }
        }

        const query: any = { client: clientId };
        if (listingId) query.listing = listingId;
        else if (type) query.type = type;

        const checklist = await Checklist.findOneAndUpdate(
            query,
            updateData,
            { new: true, upsert: true }
        )
            .populate('client', 'name email')
            .populate('listing', 'title address');

        return NextResponse.json({ checklist });
    } catch (error) {
        console.error('Error updating checklist:', error);
        return NextResponse.json(
            { error: 'Failed to update checklist' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });
        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const checklistId = searchParams.get('checklistId');

        if (!checklistId) {
            return NextResponse.json({ error: 'Checklist ID is required' }, { status: 400 });
        }

        const deletedChecklist = await Checklist.findByIdAndDelete(checklistId);

        if (!deletedChecklist) {
            return NextResponse.json({ error: 'Checklist not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Checklist deleted successfully' });
    } catch (error) {
        console.error('Error deleting checklist:', error);
        return NextResponse.json(
            { error: 'Failed to delete checklist' },
            { status: 500 }
        );
    }
}
