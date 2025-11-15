import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';

// This public API fetches listings for your main website
export async function GET() {
  try {
    await connectDB();
    const listings = await Listing.find({ status: { $ne: 'sold' } })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}