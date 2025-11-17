import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    console.error('ImgBB API key is not configured.');
    return NextResponse.json({ error: 'Image hosting is not configured on the server.' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const image = formData.get('image') as File | null;

    if (!image) {
      return NextResponse.json({ error: 'No image file was provided.' }, { status: 400 });
    }

    // Convert the image file to a base64 string, which is what the ImgBB API expects.
    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');

    // Create a new form to send to the ImgBB API.
    const imgbbFormData = new FormData();
    imgbbFormData.append('image', imageBase64);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: imgbbFormData,
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      console.error('ImgBB API Error:', result);
      const errorMessage = result.error?.message || 'Unknown error from ImgBB';
      return NextResponse.json({ error: `Failed to upload image: ${errorMessage}` }, { status: 500 });
    }

    // Return the public URL of the uploaded image.
    return NextResponse.json({ url: result.data.url });

  } catch (error) {
    console.error('[API /upload] Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred during image upload.' }, { status: 500 });
  }
}