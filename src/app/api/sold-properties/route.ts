import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';

export async function GET() {
  try {
    await connectDB();
    // Find only sold listings and sort by the date they were sold
    const properties = await Listing.find({ status: 'sold' })
      .sort({ soldDate: -1 })
      .select('title address price soldPrice bedrooms bathrooms sqft featuredImage representation');
    return NextResponse.json(properties);
  } catch (error) {
    console.error('[API GET /sold-properties]', error);
    return NextResponse.json({ error: 'Failed to fetch sold properties' }, { status: 500 });
  }
}