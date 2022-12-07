var gulp = require("gulp");

gulp.task(
    "copy-to-dist-fbuildscripts",
    function () {
        // console.log("START! copy-to-dist.js");

        return gulp.src(["./package.json", "./gulp/**/*", "./gulpfile.js", "./npm-link.sh"], { base: "." }).pipe(gulp.dest("./dist"))
    }
);
