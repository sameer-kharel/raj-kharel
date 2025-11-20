import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Listing from '@/models/Listing';

// Admin: GET all listings (active and pending)
export async function GET() {
  try {
    await connectDB();
    const listings = await Listing.find({ status: { $ne: 'sold' } }).sort({ createdAt: -1 });
    return NextResponse.json(listings);
  } catch (error) {
    console.error('[API GET /admin/listings]', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}

// Admin: POST a new listing
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Basic validation to ensure required fields are present
    const requiredFields = ['title', 'address', 'price', 'bedrooms', 'bathrooms', 'sqft', 'featuredImage', 'description', 'features'];
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0 && body[field] !== false) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const newListing = await Listing.create(body);
    return NextResponse.json(newListing, { status: 201 });
  } catch (error: any) {
    console.error('[API POST /admin/listings]', error);

    // Handle duplicate key error (E11000) for the 'address' field
    if (error.code === 11000 && error.keyPattern?.address) {
      return NextResponse.json(
        { error: 'A listing with this address already exists. Please use a unique address.' },
        { status: 409 }
      );
    }

    // Handle other validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const errors: { [key: string]: string } = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    // Generic server error
    return NextResponse.json({ error: 'Failed to create listing on the server.' }, { status: 500 });
  }
}