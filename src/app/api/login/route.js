// src/app/api/login/route.js

import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'; 

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function POST(req) {
    const { email, password } = await req.json();

    if (email === 'admin@example.com' && password === 'admin123') {

        const token = jwt.sign({email: email}, SECRET_KEY, { expiresIn: '6h' });

        const response = NextResponse.json({ status: 'success', message: 'Logged in successfully', token });

        response.cookies.set('token', token, {
            httpOnly: true,      
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict',  
            maxAge: 60 * 60 * 24 * 7, 
            path: '/',           
          });

          return response;

        // return new Response(
        //     JSON.stringify({ message: 'Login successful', token: token }),
        //     { status: 200 }
        // );
    }

    return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401 }
    );
}
