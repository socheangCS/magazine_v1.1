const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        sm: { max: "699px" },
        ms: { max: "798px" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
});
