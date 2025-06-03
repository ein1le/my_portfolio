/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1e1e1e',
        sidebar: '#23232b',
        accent: '#007acc',
        accent2: '#b5cea8',
        card: '#23232b',
        border: '#31313a',
        text: '#d4d4d4',
      },
      fontFamily: {
        mono: [
          'Fira Mono',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.10)',
        cardHover: '0 6px 24px #007acc33',
      },
    },
  },
  plugins: [],
}

