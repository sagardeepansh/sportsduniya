// /app/api/news/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || 1; // <-- get page param from URL

  try {
    const response = await fetch(
      `https://content.guardianapis.com/search?api-key=ad27d0ad-c159-4c87-85b9-354a7562c210&show-fields=thumbnail,body,byline&page-size=13&page=${page}`
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Something went wrong', error }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
