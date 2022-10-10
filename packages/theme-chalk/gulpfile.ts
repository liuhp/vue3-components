import gulpSass from "gulp-sass"
import dartSass from "sass"
import autoPrefixer from "gulp-autoprefixer"
import cleanCss from "gulp-clean-css"
import { series, src, dest } from "gulp"
import path from "path"

function complie() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(__dirname, "./src/*.scss"))
    .pipe(sass.sync())
    .pipe(autoPrefixer())
    .pipe(cleanCss())
    .pipe(dest("./dist/css"))
}
function copyfullStyle() {
  return src(path.resolve(__dirname, "./dist/**")).pipe(
    dest(path.resolve(__dirname, "../../dist/theme-chalk"))
  )
}

export default series(complie, copyfullStyle)
