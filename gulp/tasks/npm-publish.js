var gulp = require("gulp");

gulp.task(
    "npm:publish:patch",
    (cb) => {
        exec('npm version patch && npm run build && cd ./dist && npm publish',
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
        exec('npm version minor && npm run build && cd ./dist && npm publish',
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
        exec('npm version major && npm run build && cd ./dist && npm publish',
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);