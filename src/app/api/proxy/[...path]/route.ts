import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const params = await context.params;
    const path = params.path.join("/");
    const backendUrl = process.env.BACKEND_URL || "http://198.211.106.97";

    // Preserve query string
    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams ? `${backendUrl}/${path}?${searchParams}` : `${backendUrl}/${path}`;

    // Forward authorization header
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
        headers["Authorization"] = authHeader;
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers,
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch from backend" }, { status: 500 });
    }
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const params = await context.params;
    const path = params.path.join("/");
    const backendUrl = process.env.BACKEND_URL || "http://198.211.106.97";

    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams ? `${backendUrl}/${path}?${searchParams}` : `${backendUrl}/${path}`;
    const body = await request.json();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
        headers["Authorization"] = authHeader;
    }

    try {
        console.log(`[Proxy POST] Forwarding to: ${url}`);
        console.log(`[Proxy POST] Backend URL env: ${process.env.BACKEND_URL}`);
        
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log(`[Proxy POST] Response status: ${response.status}`);
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error(`[Proxy POST] Error:`, error);
        return NextResponse.json({ 
            error: "Failed to fetch from backend", 
            details: error instanceof Error ? error.message : String(error),
            url 
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const params = await context.params;
    const path = params.path.join("/");
    const backendUrl = process.env.BACKEND_URL || "http://198.211.106.97";

    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams ? `${backendUrl}/${path}?${searchParams}` : `${backendUrl}/${path}`;
    const body = await request.json();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
        headers["Authorization"] = authHeader;
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch from backend" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const params = await context.params;
    const path = params.path.join("/");
    const backendUrl = process.env.BACKEND_URL || "http://198.211.106.97";

    const searchParams = request.nextUrl.searchParams.toString();
    const url = searchParams ? `${backendUrl}/${path}?${searchParams}` : `${backendUrl}/${path}`;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
        headers["Authorization"] = authHeader;
    }

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers,
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch from backend" }, { status: 500 });
    }
}
