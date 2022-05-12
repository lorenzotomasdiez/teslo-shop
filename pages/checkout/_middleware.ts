import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "../../utils";

export async function middleware(req: NextRequest, ev:NextFetchEvent){
    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    console.log({session})
    
    if(!session){
        const requestedPage = req.page.name;
        const {origin} = req.nextUrl;
        return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`)
    }
    
    return NextResponse.next();

    /* const {token=''} = req.cookies;

    try {
        await jwt.isValidToken(token);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(`/auth/login?p=${req.page.name}`)
    } */
}