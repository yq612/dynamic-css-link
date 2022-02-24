import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import path from "path";

const pkg = require(path.resolve("./", `package.json`));

export default [
  {
    input: "src/index.ts",
    output: {
      file: pkg.module,
      format: 'umd',
      dir: "dist",
    },
    plugins: [resolve({ browser: true }), commonjs(), typescript(), uglify()],
    sourceMap: true,
  },
];
