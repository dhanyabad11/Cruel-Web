import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Add cache control headers to prevent browser caching of authenticated pages
    const protectedPaths = [
        "/dashboard",
        "/deadlines",
        "/portals",
        "/notifications",
        "/whatsapp",
        "/settings",
    ];
    const authPaths = ["/login", "/register"];

    const isProtectedPath = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
    );
    const isAuthPath = authPaths.some((path) => request.nextUrl.pathname.startsWith(path));

    if (isProtectedPath || isAuthPath) {
        // Prevent caching of these pages
        response.headers.set(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Surrogate-Control", "no-store");
    }

    return response;
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/deadlines/:path*",
        "/portals/:path*",
        "/notifications/:path*",
        "/whatsapp/:path*",
        "/settings/:path*",
        "/login",
        "/register",
        "/auth/callback",
    ],
};
