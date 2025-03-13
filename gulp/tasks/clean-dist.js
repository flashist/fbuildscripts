var gulp = require("gulp");
const { rimraf } = require("rimraf");

gulp.task(
    "clean-dist",
    () => {
        return rimraf("./dist/**/*");
    }
);