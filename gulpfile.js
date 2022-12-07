var gulp = require("gulp");
var exec = require('child_process').exec;

var requireDir = require("require-dir");
var tasks = requireDir("./gulp/tasks");

// Default
gulp.task(
    "default",
    gulp.series(
        "prompts-choose-task"
    )
);