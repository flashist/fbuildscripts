var gulp = require("gulp");
var requireDir = require("require-dir");

var tasks = requireDir("./gulp/tasks");

gulp.task(
    'build-fbuildscripts',
    gulp.series(
        "clean-dist",
        // "generate-definitions",
        "copy-to-dist-fbuildscripts",
        "compile-lib"
    )
);

gulp.task(
    'build-lib-module',
    gulp.series(
        "clean-dist",
        // "generate-definitions",
        "copy-to-dist",
        "compile-lib"
    )
);

// Default
gulp.task(
    "default",
    gulp.series(
        "build-fbuildscripts"
    )
);