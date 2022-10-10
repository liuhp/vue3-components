import { spawn } from "child_process"
import { projectRoot } from "./paths"

export const withTaskName = <T>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

export const run = async (command: string) => {
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(" ")
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: "inherit", // 直接将子进程输出
      shell: true, // 默认情况下，Linux才支持rm -rf
    })
    app.on("close", resolve)
  })
}
