import { defineConfig } from "tsup";

export default defineConfig((_options) => ({
  entry: ["index.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  shims: true,
  dts: true,
  format: ["esm", "cjs"]
}));
