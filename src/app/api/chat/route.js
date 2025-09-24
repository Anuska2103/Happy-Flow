import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get the form data from the incoming request
    const formData = await request.formData();
    const prompt = formData.get('prompt');
    const file = formData.get('file');

    // Check for missing data
    if (!prompt || !file) {
      return NextResponse.json({ error: 'Missing prompt or file' }, { status: 400 });
    }

    // Create a new FormData object to send to the Flask backend
    const backendFormData = new FormData();
    backendFormData.append('prompt', prompt);
    backendFormData.append('file', file);

    // Proxy the request to your Flask server
    const backendResponse = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      body: backendFormData,
    });

    // Check if the Flask server's response was successful
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}