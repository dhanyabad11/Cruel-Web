import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook to aggressively prevent browser back button navigation
 * Use this on protected pages to prevent users from going back to login
 */
export function usePreventBack() {
    const router = useRouter();

    useEffect(() => {
        // Prevent back navigation with multiple layers
        let isNavigating = false;

        // Method 1: History manipulation
        const preventBack = () => {
            if (!isNavigating) {
                window.history.pushState(null, "", window.location.href);
                window.history.pushState(null, "", window.location.href);
            }
        };

        // Initial setup
        preventBack();

        // Method 2: Listen to popstate (back/forward button)
        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault();
            e.stopPropagation();
            preventBack();
            return false;
        };

        // Method 3: Listen to beforeunload
        const handleBeforeUnload = () => {
            preventBack();
        };

        // Method 4: Prevent hash changes
        const handleHashChange = (e: HashChangeEvent) => {
            e.preventDefault();
            preventBack();
            return false;
        };

        // Method 5: Override history methods
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;
        
        window.history.pushState = function(...args) {
            if (!isNavigating) {
                originalPushState.apply(window.history, args);
                preventBack();
            }
        };

        window.history.replaceState = function(...args) {
            if (!isNavigating) {
                originalReplaceState.apply(window.history, args);
                preventBack();
            }
        };

        // Attach all listeners
        window.addEventListener("popstate", handlePopState, true);
        window.addEventListener("beforeunload", handleBeforeUnload, true);
        window.addEventListener("hashchange", handleHashChange, true);

        // Method 6: Continuous monitoring
        const interval = setInterval(preventBack, 100);

        // Cleanup
        return () => {
            isNavigating = true;
            clearInterval(interval);
            window.removeEventListener("popstate", handlePopState, true);
            window.removeEventListener("beforeunload", handleBeforeUnload, true);
            window.removeEventListener("hashchange", handleHashChange, true);
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
        };
    }, [router]);
}
