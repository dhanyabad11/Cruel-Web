import { useEffect } from "react";

/**
 * Hook to prevent browser back button navigation
 * Use this on protected pages to prevent users from going back to login
 */
export function usePreventBack() {
    useEffect(() => {
        // Push initial state
        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            // When back button is pressed, push state again to stay on current page
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);
}
