var gulp = require("gulp");

gulp.task(
    "copy-to-dist",
    function () {
        // console.log("START! copy-to-dist.js");

        return gulp.src(["./package.json", "./gulp/**/*", "./gulpfile.js"], { base: "." }).pipe(gulp.dest("./dist"))
    }
);
