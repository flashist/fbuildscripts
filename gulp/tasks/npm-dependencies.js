var gulp = require("gulp");
var exec = require("child_process").exec;
var prompts = require("prompts");

// var requireDir = require("require-dir");
// var tasks = requireDir("./");
// var suggestByAutocompleteScore = tasks.suggestByAutocompleteScore;
var suggestByAutocompleteScore = require("./interactive-prompts").suggestByAutocompleteScore

gulp.task(
    "npm:dependencies:update",
    async (cb) => {

        const libResponse = await prompts({
            type: 'autocomplete',
            name: 'value',
            message: 'Choose the lib to update',
            choices: [
                { title: "@flashist/fbuildscripts" },
                { title: "@flashist/fcore" },
                { title: "@flashist/flibs" },
                { title: "@flashist/fconsole" },
                { title: "@flashist/appframework" },
            ],
            suggest: suggestByAutocompleteScore
        });

        const versionResponse = await prompts({
            type: 'text',
            name: 'value',
            message: 'Choose the version to install'
        });

        return exec(`npm i ${libResponse.value}@${versionResponse.value} --no-save`,
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err);
            }
        );
    }
);