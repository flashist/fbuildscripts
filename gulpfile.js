var gulp = require("gulp");
var exec = require('child_process').exec;

var requireDir = require("require-dir");
var tasks = requireDir("./gulp/tasks");

// Defining the name of the initial task that should be selected (emulating user input)
global.fbuildscripts_initial = "build-and-publish";

// Default
gulp.task(
    "default",
    gulp.series(
        "prompts-choose-task"
    )
);