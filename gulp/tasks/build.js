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

gulp.task(
    'build-and-publish-module',
    gulp.series(
        "build",
        "git-commit-all-with-default-message",
        "npm:publish:patch",
        "git-push-all"
    )
);