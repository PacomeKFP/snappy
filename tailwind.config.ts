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
        "snappy-white":"ffffff",
        "snappy-black":"171717",
        "snappy-gray":"D9D9D9",
        "snappy-first-blue":"247EE4",
        "snappy-second-blue":"0069E0",
        "snappy-dark-blue":"322F44",
        "snappy-orange":"FF8000",
        "snappy-green":"14F400",

      },
      backdropBlur: {
        'sm': '2px',
        'md': '4px',
        'lg': '8px',
        'xl': '16px',
        'custom': '15px',
      }
    },
  },
  plugins: [],
};
export default config;
