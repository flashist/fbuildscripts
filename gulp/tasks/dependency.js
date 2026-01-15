// var requireDir = require("require-dir");
// var tasks = requireDir("./");
// var suggestByAutocompleteScore = tasks.suggestByAutocompleteScore;
// var suggestByAutocompleteScore = require("./interactive-prompts").suggestByAutocompleteScore

var gulp = require("gulp");
var exec = require("child_process").exec;
var prompts = require("prompts");
var suggestByAutocompleteScore = require("./interactive-prompts").suggestByAutocompleteScore
// import gulp from "gulp";

const flashistLibNames = [
    "@flashist/fbuildscripts",
    "@flashist/fcore",
    "@flashist/flibs",
    "@flashist/fconsole",
    "@flashist/appframework"
];

const libNamesConvertedToChoices = flashistLibNames.map(
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
    'dependency:update-all',
    async () => {
        return new Promise(
            async (resolve) => {
                const curLibConfig = require("./package.json")
                const curLibName = curLibConfig.name;
                const curLibFolder = getLibFolderNameFromLibName(curLibName);

                // const buildAndPublishExec = async () => {
                //     return new Promise(
                //         (execPromiseResolve) => {
                //             const tempExecText = `cd ../${curLibFolder} && npx gulp build-and-publish-module`;
                //             // const tempExecText = `ls`;
                //             console.log("Exec text: ", tempExecText);
                //             exec(
                //                 tempExecText,
                //                 function (err, stdout, stderr) {
                //                     console.log(stdout);
                //                     console.log(stderr);
                //                     // cb(err);
                //                     execPromiseResolve(err);
                //                 }
                //             );
                //         }
                //     )
                // };

                const installDependencyTo = async (libName, dependencyName) => {
                    return new Promise(
                        (execDependencyPromise) => {
                            const libFolderName = getLibFolderNameFromLibName(libName);
                            const dependencyFolderName = getLibFolderNameFromLibName(dependencyName);
                            const dependencyVersion = require(`../${dependencyFolderName}.package.json`).version;

                            const tempExecText = `cd ../${libFolderName} && npm i ${dependencyName}@${dependencyVersion}`;
                            // const tempExecText = `ls`;
                            console.log("Exec text: ", tempExecText);
                            exec(
                                tempExecText,
                                function (err, stdout, stderr) {
                                    console.log(stdout);
                                    console.log(stderr);
                                    // cb(err);
                                    execDependencyPromise(err);
                                }
                            );
                        }
                    )
                };

                // for (let libNamesConvertedToChoices)
                let libIndex = flashistLibNames.indexOf(curLibName);
                // let libsCount = flashistLibNames.length;
                // for (let libIndex = libStartIndex; libIndex < libsCount; libIndex++) {
                let tempLibName = flashistLibNames[libIndex];

                // Installing dependencies for the lib
                if (libIndex > 0) {
                    for (let dependencyIndex = libIndex - 1; dependencyIndex < libIndex; dependencyIndex++) {
                        let tempDependencyName = flashistLibNames[libIndex];
                        await installDependencyTo(tempLibName, tempDependencyName);
                    }
                }
                // await buildAndPublishExec(tempLibName);
                // }

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
exports.dependencyLibNames = flashistLibNames;
exports.libNamesConvertedToChoices = libNamesConvertedToChoices;
exports.chooseLibName = chooseLibName;
exports.getLibFolderNameFromLibName = getLibFolderNameFromLibName;