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
        primary: "#ff6568",
        cprimary: "#ff8d60",
        dprimary: "#ff3a71",
        base: "#DDD1CD",
        cbase: "#F3E7E4",
        dbase: "#C8BEBB",
      },
    },
  },
  plugins: [],
};
export default config;
