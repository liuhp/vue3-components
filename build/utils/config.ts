import path from "path"
import { outDir } from "./paths"

export const modules = ["esm", "cjs"] as const
export type Module = typeof modules[number]

export const buildConfig = {
  esm: {
    module: "ESNext",
    format: "esm",
    ext: "mjs",
    output: {
      name: "es",
      path: path.resolve(outDir, "es"),
    },
    bundle: {
      path: "vue3-components/es",
    },
  },
  cjs: {
    module: "CommonJS",
    format: "cjs",
    ext: "js",
    output: {
      name: "lib",
      path: path.resolve(outDir, "lib"),
    },
    bundle: {
      path: "vue3-components/lib",
    },
  },
}

export type BuildConfig = typeof buildConfig
