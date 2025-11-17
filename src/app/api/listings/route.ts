import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';

export async function GET() {
  try {
    await connectDB();
    // Find only active listings and sort by newest first
    const listings = await Listing.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .select('title address price bedrooms bathrooms sqft featuredImage');
    return NextResponse.json(listings);
  } catch (error) {
    console.error('[API GET /listings]', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}