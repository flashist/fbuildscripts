var gulp = require("gulp");
var exec = require("child_process").exec;
var prompts = require("prompts");
var fs = require('fs');
var path = require('path');

// var requireDir = require("require-dir");
// var tasks = requireDir("./");
// var suggestByAutocompleteScore = tasks.suggestByAutocompleteScore;
var suggestByAutocompleteScore = require("./interactive-prompts").suggestByAutocompleteScore

const dependencyLibNames = ["@flashist/fbuildscripts", "@flashist/fcore", "@flashist/flibs", "@flashist/fconsole", "@flashist/appframework"]

gulp.task(
    "npm:dependencies:update",
    async (cb) => {

        const libNamesConvertedToChoices = dependencyLibNames.map(
            (singleLibName) => {
                return { title: singleLibName }
            }
        );

        const libResponse = await prompts({
            type: 'autocomplete',
            name: 'value',
            message: 'Choose the lib to update',
            choices: libNamesConvertedToChoices,
            suggest: suggestByAutocompleteScore
        });

        const versionResponse = await prompts({
            type: 'text',
            name: 'value',
            initial: 'latest',
            message: 'Choose the version to install'
        });

        // const dependencyVersion = `${libResponse.value}@${versionResponse.value}`;
        // console.log("Version to install: ", dependencyVersion);
        // return exec(`npm i ${dependencyVersion} --no-save`,
        //     function (err, stdout, stderr) {
        //         console.log(stdout);
        //         console.log(stderr);
        //         cb(err);
        //     }
        // );
        await updateLibToVersion(libResponse.value, versionResponse.value);
        cb();
    }
);

gulp.task(
    "npm:all-dependencies:update-to-latest",
    async (cb) => {

        console.log("Removing the package-lock file");
        if (fs.existsSync('./package-lock.json')) {
            fs.unlinkSync('./package-lock.json');
        }

        const libNamesCount = dependencyLibNames.length;
        for (let libNameIndex = 0; libNameIndex < libNamesCount; libNameIndex++) {
            const singleLibName = dependencyLibNames[libNameIndex];
            await updateLibToVersion(singleLibName, "latest");
        }
    }
);

var updateLibToVersion = (libName, version) => {
    return new Promise(
        (resolve) => {
            const dependencyVersion = `${libName}@${version}`;
            console.log("Version to install: ", dependencyVersion);
            exec(`npm i ${dependencyVersion} --no-save`,
                function (err, stdout, stderr) {
                    resolve(err);
                }
            );
        }
    )
}