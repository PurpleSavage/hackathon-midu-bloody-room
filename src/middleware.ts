import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: Request){
    const secret = new TextEncoder().encode(process.env.NEXT_JWT_SECRET);
    const cookie = cookies();
    const token = cookie.get('auth-token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));     
    }
    try {
        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        console.log('Error verifying token:', error);
        // En caso de error, redirigir al home
        return NextResponse.redirect(new URL('/', req.url));
    }
}
export const config = {
    matcher: ['/voicechanel/:path*'],
};