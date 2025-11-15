import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';
import mongoose from 'mongoose';

// Helper function to extract ID from URL
function getIdFromReq(req: NextRequest): string | null {
  try {
    const url = new URL(req.url);
    // The pathname will be like /api/admin/listings/691788fbf2a9bdf4b01d45e2
    // We split by '/' and take the last part.
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    return id;
  } catch (error) {
    console.error("Failed to parse ID from request URL", error);
    return null;
  }
}

// Admin: PATCH (update) a listing, e.g., mark as sold
export async function PATCH(req: NextRequest) { // We remove the 'context' parameter entirely
  try {
    // --- START OF THE DEFINITIVE FIX ---
    // We get the ID directly from the request URL, avoiding the problematic context object.
    const id = getIdFromReq(req);
    if (!id) {
      return NextResponse.json({ error: 'Could not determine listing ID from URL' }, { status: 400 });
    }
    // --- END OF THE DEFINITIVE FIX ---

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid listing ID format' }, { status: 400 });
    }

    await connectDB();
    const body = await req.json();

    if (body.status === 'sold' && !body.soldDate) {
      body.soldDate = new Date();
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, body, { new: true });

    if (!updatedListing) {
      return NextResponse.json({ error: 'Listing not found with the given ID' }, { status: 404 });
    }

    return NextResponse.json(updatedListing);
  } catch (error: any) {
    console.error('[API PATCH /admin/listings/[id]]', error);
    return NextResponse.json({ error: 'Failed to update listing on the server.' }, { status: 500 });
  }
}

// Admin: DELETE a listing
export async function DELETE(req: NextRequest) { // We remove the 'context' parameter here as well
  try {
    // Apply the same fix here for consistency
    const id = getIdFromReq(req);
    if (!id) {
      return NextResponse.json({ error: 'Could not determine listing ID from URL' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid listing ID format' }, { status: 400 });
    }

    await connectDB();
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
      return NextResponse.json({ error: 'Listing not found with the given ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Listing deleted successfully' });
  } catch (error: any) {
    console.error('[API DELETE /admin/listings/[id]]', error);
    return NextResponse.json({ error: 'Failed to delete listing on the server.' }, { status: 500 });
  }
}