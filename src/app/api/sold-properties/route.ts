import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';

// This public API fetches sold properties for your main website
export async function GET() {
  try {
    await connectDB();
    const soldListings = await Listing.find({ status: 'sold' })
      .sort({ soldDate: -1 })
      .lean();
    return NextResponse.json(soldListings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sold properties' }, { status: 500 });
  }
}