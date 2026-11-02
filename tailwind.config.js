/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["JetBrains Mono", "monospace"],
        display: ["JetBrains Mono", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        hacker: {
          900: "#05080C",
          800: "#0A0F15",
          700: "#111820",
          green: "#008A35",
          "green-dark": "#007A2F",
          signal: "#3DBE6B",
          cyan: "#38BDF8",
          purple: "#A78BFA",
        },
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-fall': 'matrix-fall 20s linear infinite',
        'scan-beam': 'scan-beam 7s cubic-bezier(0.45, 0, 0.55, 1) infinite',
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
        },
        // Sweeps top -> bottom, fades out, then rests before the next pass
        'scan-beam': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '8%': { opacity: 1 },
          '70%': { transform: 'translateY(0%)', opacity: 1 },
          '78%, 100%': { transform: 'translateY(0%)', opacity: 0 },
        },
      }
    },
  },
  plugins: [],
};
