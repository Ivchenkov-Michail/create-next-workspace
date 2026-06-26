import path from "node:path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((file) => `"${path.relative(process.cwd(), file)}"`)
    .join(" ")}`;

export default {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
