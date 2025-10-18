import { NextResponse } from "next/server";

export async function GET() {
    const backendUrl = process.env.BACKEND_URL || "NOT_SET";
    const publicApiUrl = process.env.NEXT_PUBLIC_API_URL || "NOT_SET";

    try {
        const healthCheck = await fetch(`${backendUrl}/health`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const healthData = await healthCheck.json();

        return NextResponse.json({
            environment: {
                BACKEND_URL: backendUrl,
                NEXT_PUBLIC_API_URL: publicApiUrl,
            },
            healthCheck: {
                status: healthCheck.status,
                data: healthData,
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                environment: {
                    BACKEND_URL: backendUrl,
                    NEXT_PUBLIC_API_URL: publicApiUrl,
                },
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
