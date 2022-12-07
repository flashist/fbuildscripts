var gulp = require("gulp");
var exec = require('gulp-exec');

gulp.task(
    "compile-lib",
    function (cb) {

        return gulp.src(".", { read: false })
            .pipe(
                exec("tsc")
            )
            .on(
                "end",
                function () {
                    cb();
                }

            ).on(
                "error",
                function (err) {
                    console.error("ERROR: ", err);
                }
            );
    }
);
