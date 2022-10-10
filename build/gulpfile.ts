import { series, parallel } from "gulp"
import { run, withTaskName } from "./utils/index"

// 打包样式、打包工具方法、打包组件库、打包每个组件、生成一个组件库、发布组件
export default series(
  withTaskName("clean", async () => run("rm -rf ./dist")),
  withTaskName("buildPackages", async () =>
    run("pnpm run --parallel build --filter ./packages ")
  )
)
