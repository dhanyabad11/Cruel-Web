import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            colors: {
                // Minimalist Color Palette
                "bg-primary": "#FFFFFF",
                "bg-secondary": "#F5F5F5",
                "text-primary": "#1A1A1A",
                "text-secondary": "#6B7280",
                "primary-blue": "#2563EB",
                "primary-blue-hover": "#1E40AF",
                "success-green": "#22C55E",
                "warning-yellow": "#EAB308",
                "danger-red": "#EF4444",
                "border-gray": "#D1D5DB",
                "disabled-gray": "#9CA3AF",

                // Keep existing vars for backward compatibility
                background: "var(--background)",
                foreground: "var(--foreground)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                sm: "var(--shadow-sm)",
                DEFAULT: "var(--shadow)",
                lg: "var(--shadow-lg)",
            },
        },
    },
    plugins: [],
};

export default config;
