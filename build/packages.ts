// 专门打包utils、指令、hook

import { parallel, series, src, dest } from "gulp"
import path from "path"
import { buildConfig } from "./utils/config"
import { projectRoot, outDir } from "./utils/paths"
import ts from "gulp-typescript"
import { withTaskName } from "./utils"

export const buildPackages = (dirname: string, name: string) => {
  // 打包的格式需要是什么类型的？模块规范：command.js，es模块规范
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name)
    return series(
      withTaskName(`build:${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, "tsconfig.json") // ts配置文件的路径
        const inputs = ["**/*.ts", "!gulpfile.ts", "!node_modules"]

        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true,
              strict: false,
              module: config.module,
            })()
          )
          .pipe(dest(output))
      }),
      withTaskName(`copy:${dirname}`, () => {
        // 放到es-> utils, lib->utils
        return src(`${output}/**`).pipe(
          dest(path.resolve(outDir, config.output.name, name))
        )
      })
    )
  })
  return parallel(...tasks)
}
