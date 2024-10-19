import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function middleware(req: Request){
    const cookie = cookies();
    const token = cookie.get('auth-token')?.value;
    if (!token) {
        console.log('hola')
        return NextResponse.redirect(new URL('/', req.url));
        
    }
    return NextResponse.next(); 
}
export const config = {
    matcher: ['/voicechanel/:path*'],
};