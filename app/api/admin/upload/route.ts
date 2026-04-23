import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN is not set' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided or invalid file format' }, { status: 400 });
    }

    console.log('API Upload: Starting put for', file.name, 'size:', file.size);

    const blob = await put(filename || file.name, file, {
      access: 'public',
    });

    console.log('API Upload: Success:', blob.url);
    return NextResponse.json(blob);
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
