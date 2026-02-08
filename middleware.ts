import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // Public routes that don't require authentication
    const isPublicRoute = pathname === "/" || pathname === "/login";

    // Protected routes that require authentication
    const isProtectedRoute = pathname.startsWith('/dashboard');

    // If user is on a protected route and not logged in, redirect to login
    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    // If user is logged in and tries to access login page, redirect to dashboard
    // if (isPublicRoute && isLoggedIn) {
    //     return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    // }

    return void 0;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}
