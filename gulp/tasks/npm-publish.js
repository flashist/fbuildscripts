var gulp = require("gulp");
var exec = require("child_process").exec;

gulp.task(
    "npm:publish:patch",
    (cb) => {
        return exec('npm version patch && gulp build && cd ./dist && npm publish',
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);

gulp.task(
    "npm:publish:minor",
    (cb) => {
        return exec('npm version minor && gulp build && cd ./dist && npm publish',
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);

gulp.task(
    "npm:publish:major",
    (cb) => {
        return exec('npm version major && gulp build && cd ./dist && npm publish',
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);

gulp.task(
    "npm:publish:prerelease",
    (cb) => {
        return exec('npm version prerelease && gulp build && cd ./dist && npm publish',
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);