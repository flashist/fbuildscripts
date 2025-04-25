var gulp = require("gulp");
var exec = require("child_process").exec;
var prompts = require("prompts");

gulp.task(
    "git:commit-all-with-default-message",
    async (cb) => {
        exec(`git add -A && git commit -m "Update"`,
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);

gulp.task(
    "git:commit-all",
    async (cb) => {
        const response = await prompts({
            type: 'text',
            name: 'value',
            initial: 'Update',
            message: 'Commit message'
        });

        exec(`git add -A && git commit -m "${response.value}"`,
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);

gulp.task(
    "git:push-all",
    async (cb) => {
        exec(`git push`,
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);