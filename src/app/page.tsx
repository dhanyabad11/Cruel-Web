"use client";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AI Cruel</h1>
            <p className="mb-8 text-lg text-gray-600 text-center max-w-xl">
                Never miss a <span className="text-indigo-600 font-bold">deadline</span> again.
                <br />
                AI Cruel extracts deadlines from WhatsApp chats, course portals, and sends you
                reminders.
            </p>
            <div className="flex space-x-4">
                <Link
                    href="/login"
                    className="px-6 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                    Sign In
                </Link>
                <Link
                    href="/login"
                    className="px-6 py-2 rounded bg-white text-indigo-600 font-medium border border-indigo-600 hover:bg-indigo-50"
                >
                    Get Started
                </Link>
            </div>
            <footer className="mt-16 text-gray-400 text-sm text-center">
                &copy; 2024 AI Cruel. Built for students, by students.
            </footer>
        </div>
    );
}
