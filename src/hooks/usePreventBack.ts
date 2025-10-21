import { useEffect } from "react";

/**
 * Hook to prevent browser back button navigation
 * Use this on protected pages to prevent users from going back to login
 */
export function usePreventBack() {
    useEffect(() => {
        // Add current page to history to block back navigation
        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            // Keep pushing state to prevent going back
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);
}
