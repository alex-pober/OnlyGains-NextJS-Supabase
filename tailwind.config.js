const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
],
plugins: [require("daisyui"), require("tailwindcss-animate")],
darkMode: ["class"],
content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
theme: {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: "calc(var(--radius) - 4px)",
    },
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
},
daisyui: {
  themes: [
    {
      'dark': {
         'primary' : '#793ef9',
         'primary-focus' : '#570df8',
         'primary-content' : '#ffffff',

         'secondary' : '#f000b8',
         'secondary-focus' : '#bd0091',
         'secondary-content' : '#ffffff',

         'accent' : '#37cdbe',
         'accent-focus' : '#2ba69a',
         'accent-content' : '#ffffff',

         'neutral' : '#2a2e37',
         'neutral-focus' : '#16181d',
         'neutral-content' : '#ffffff',

         'base-100' : '#3b424e',
         'base-200' : '#2a2e37',
         'base-300' : '#16181d',
         'base-content' : '#ebecf0',

         'info' : '#66c7ff',
         'success' : '#87cf3a',
         'warning' : '#e1d460',
         'error' : '#ff6b6b',

        '--rounded-box': '1rem',
        '--rounded-btn': '.5rem',
        '--rounded-badge': '1.9rem',

        '--animation-btn': '.25s',
        '--animation-input': '.2s',

        '--btn-text-case': 'uppercase',
        '--navbar-padding': '.5rem',
        '--border-btn': '1px',
      },
    },
  ],
},
}
