var gulp = require("gulp");
var exec = require('gulp-exec');

gulp.task(
    "compile-lib",
    function (cb) {

        return gulp.src(".", { read: false })
            .pipe(
                exec("tsc --color")
            )
            .on(
                "end",
                function () {
                    cb();
                }

            ).on(
                "error",
                function () {
                    console.error("ERROR! compile.js");
                }
            );
    }
);
