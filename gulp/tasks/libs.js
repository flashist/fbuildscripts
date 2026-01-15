// var requireDir = require("require-dir");
// var tasks = requireDir("./");
// var suggestByAutocompleteScore = tasks.suggestByAutocompleteScore;
// var suggestByAutocompleteScore = require("./interactive-prompts").suggestByAutocompleteScore

var gulp = require("gulp");
var exec = require("child_process").exec;
var prompts = require("prompts");
var suggestByAutocompleteScore = require("./interactive-prompts").suggestByAutocompleteScore
// import gulp from "gulp";

const dependencyLibNames = [
    "@flashist/fbuildscripts",
    "@flashist/fcore",
    "@flashist/flibs",
    "@flashist/fconsole",
    "@flashist/appframework"
];

const libNamesConvertedToChoices = dependencyLibNames.map(
    (singleLibName) => {
        return { title: singleLibName }
    }
);

async function chooseLibName() {
    const libResponse = await prompts({
        type: 'autocomplete',
        name: 'value',
        message: 'Choose the lib to update',
        choices: libNamesConvertedToChoices,
        suggest: suggestByAutocompleteScore
    });

    return libResponse.value;
}

function getLibFolderNameFromLibName(libName) {
    return libName.split("@flashist/").join("");
}

gulp.task(
    'multipleLibs:build',
    async () => {
        return new Promise(
            async (resolve) => {
                const startLibName = await chooseLibName();

                const buildAndPublishLib = async (libName) => {
                    return new Promise(
                        (execPromiseResolve) => {
                            const libFolderName = getLibFolderNameFromLibName(libName);
                            const tempExecText = `cd ../${libFolderName} && npx gulp build-and-publish-module`;
                            // const tempExecText = `ls`;
                            console.log("Exec text: ", tempExecText);
                            exec(
                                tempExecText,
                                function (err, stdout, stderr) {
                                    console.log(stdout);
                                    console.log(stderr);
                                    // cb(err);
                                    execPromiseResolve(err);
                                }
                            );
                        }
                    )
                }

                // for (let libNamesConvertedToChoices)
                let libStartIndex = dependencyLibNames.indexOf(startLibName);
                let libsCount = dependencyLibNames.length;
                for (let libIndex = libStartIndex; libIndex < libsCount; libIndex++) {
                    let tempLibName = dependencyLibNames[libIndex];
                    await buildAndPublishLib(tempLibName);
                }

                resolve();

                // return exec('npm version patch && npx gulp build && cd ./dist && npm publish',
                //     function (err, stdout, stderr) {
                //         console.log(stdout);
                //         console.log(stderr);
                //         cb(err);
                //     }
                // );
            }
        );
    }
);

// EXPORTS
exports.dependencyLibNames = dependencyLibNames;
exports.libNamesConvertedToChoices = libNamesConvertedToChoices;
exports.chooseLibName = chooseLibName;
exports.getLibFolderNameFromLibName = getLibFolderNameFromLibName;