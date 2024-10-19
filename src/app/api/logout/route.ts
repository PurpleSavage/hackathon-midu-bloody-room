import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const cookie = cookies()
    cookie.set({
        name: 'auth-token',
        value: '',
        httpOnly: true,
        path: '/',
        maxAge: 0, 
    }); 
    return NextResponse.redirect(new URL('/', req.url))
}