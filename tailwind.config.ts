import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          50: "#E6F7F5",
          100: "#B3E8E3",
          200: "#80D9D1",
          300: "#4DCABF",
          400: "#26BEAF",
          500: "#0B9586", // Main teal color from design
          600: "#097A6E",
          700: "#076057",
          800: "#054640",
          900: "#032B28",
        },
        // Accent Orange Colors
        accent: {
          50: "#FFF8E6",
          100: "#FFEAB3",
          200: "#FFDC80",
          300: "#FFCE4D",
          400: "#FFC326",
          500: "#FFB800", // Main orange/gold
          600: "#CC9300",
          700: "#996F00",
          800: "#664A00",
          900: "#332500",
        },
        // Dark theme colors
        dark: {
          50: "#E8E8EA",
          100: "#B9B9BC",
          200: "#8A8A8F",
          300: "#5B5B61",
          400: "#3D3D44",
          500: "#1E1E26",
          600: "#18181F",
          700: "#121217",
          800: "#0C0C10",
          900: "#060608",
        },
        // Surface colors for cards/backgrounds
        surface: {
          light: "#FFFFFF",
          DEFAULT: "#F8F9FA",
          dark: "#1A1A2E",
          card: "#FFFFFF",
          elevated: "#F0F4F8",
        },
        // Course card gradient colors
        course: {
          primary: "#1A3A4A",
          secondary: "#2D5A6B",
          accent: "#0B9586",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-lg": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-sm": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-lg": ["2.25rem", { lineHeight: "1.25" }],
        "heading-md": ["1.875rem", { lineHeight: "1.3" }],
        "heading-sm": ["1.5rem", { lineHeight: "1.35" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 10px 40px -15px rgba(0, 0, 0, 0.1)",
        "glow": "0 0 40px rgba(11, 149, 134, 0.15)",
        "glow-accent": "0 0 40px rgba(255, 184, 0, 0.15)",
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0B9586 100%)",
        "card-gradient": "linear-gradient(145deg, #1A3A4A 0%, #0B9586 100%)",
        "course-gradient": "linear-gradient(180deg, #1A3A4A 0%, #2D5A6B 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;

