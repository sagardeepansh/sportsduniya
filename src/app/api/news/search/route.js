import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const section = searchParams.get('section') || '';

    let apiUrl = `https://content.guardianapis.com/search?api-key=ad27d0ad-c159-4c87-85b9-354a7562c210&show-fields=thumbnail,body,byline&show-tags=contributor&page-size=13`;

    if (query) {
      apiUrl += `&q=${encodeURIComponent(query)}`;
    }
    if (section) {
      apiUrl += `&section=${encodeURIComponent(section)}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong', error: String(error) },
      { status: 500 }
    );
  }
}
