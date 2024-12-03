import type { Config } from "tailwindcss";
import TailwindTypography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // To support webp, @support is needed. "bg-modern-architecture" is a custom class in global.css
        // "modern-architecture": "url('/images/modern-architecture-q70-x0.5.jpg')", 
      },
      screens: {
        'custom-grid-two-rows': '760px',
      },
    },
    fontFamily: {
      sans: ["Inter Variable", "ui-sans-serif", "system-ui"],
      display: ["Inter Tight Variable", "ui-sans-serif", "system-ui"],
    },
  },
  plugins: [
    TailwindTypography,
  ],
} satisfies Config;