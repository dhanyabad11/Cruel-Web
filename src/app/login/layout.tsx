import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - AI Cruel",
    description: "Sign in to AI Cruel",
    robots: "noindex, nofollow",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
            <meta httpEquiv="Pragma" content="no-cache" />
            <meta httpEquiv="Expires" content="0" />
            {children}
        </>
    );
}
