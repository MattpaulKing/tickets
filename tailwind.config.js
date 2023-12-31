export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {
    themes: ["dark"]
      },
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

