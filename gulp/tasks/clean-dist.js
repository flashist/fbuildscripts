var gulp = require("gulp");
var rimraf = require("rimraf");

gulp.task(
    "clean-dist",
    (cb) => {
        return rimraf("./dist/**/*", cb);
    }
);