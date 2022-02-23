import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      entryFileNames: "[name].js",
    },
    plugins: [resolve({ browser: true }), commonjs(), typescript(), uglify()],
    sourceMap: true,
  },
];
