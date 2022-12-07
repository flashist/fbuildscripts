var gulp = require("gulp");

var requireDir = require("require-dir");
var tasks = requireDir("./");

gulp.task(
    'build',
    gulp.series(
        "clean-dist",
        // "generate-definitions",
        "copy-to-dist",
        "compile"
    )
);