/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        hacker: {
          900: "#050B14",
          800: "#091428",
          700: "#0D1E3A",
          green: "#00FF66",
          cyan: "#00E5FF",
          purple: "#B200FF",
        },
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-fall': 'matrix-fall 20s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        },
        'matrix-fall': {
          '0%': { backgroundPosition: '0% -100%' },
          '100%': { backgroundPosition: '0% 100%' },
        }
      }
    },
  },
  plugins: [],
};
