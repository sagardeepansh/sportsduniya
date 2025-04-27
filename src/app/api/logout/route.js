import { NextResponse } from 'next/server';

export async function POST(req) {
  // Create a response object
  const response = NextResponse.json({
    status: 'success',
    message: 'Logged out successfully',
  });

  // Clear the 'token' cookie by setting it with an expired maxAge
  response.cookies.set('token', '', {
    httpOnly: true, // Makes sure the cookie can't be accessed via JavaScript
    secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent only over HTTPS in production
    sameSite: 'Strict', // Helps mitigate CSRF attacks
    maxAge: -1, // Expiry time in the past to delete the cookie
    path: '/', // Ensure the cookie is cleared for the whole site
  });

  return response;
}
