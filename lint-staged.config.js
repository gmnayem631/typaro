import path from "node:path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(" ")}`;

const config = {
  "*.{js,jsx,ts,tsx,css}": ["prettier --write", buildEslintCommand],
};

export default config;
