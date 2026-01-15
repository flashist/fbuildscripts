var gulp = require("gulp");
var exec = require("child_process").exec;
var prompts = require("prompts");
var fs = require("fs");

var suggestByAutocompleteScore = require("./interactive-prompts").suggestByAutocompleteScore

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
                const curLibConfig = JSON.parse(fs.readFileSync('./package.json'));
                const curLibName = curLibConfig.name;

                const installDependencyTo = async (libName, dependencyName) => {
                    console.log("installDependencyTo __ libName: ", libName, " | dependencyName: ", dependencyName);
                    return new Promise(
                        (execDependencyPromise) => {
                            const libFolderName = getLibFolderNameFromLibName(libName);

                            const dependencyFolderName = getLibFolderNameFromLibName(dependencyName);
                            const dependencyConfig = JSON.parse(fs.readFileSync(`../${dependencyFolderName}/package.json`));
                            const dependencyVersion = dependencyConfig.version;

                            const tempExecText = `cd ../${libFolderName} && npm i ${dependencyName}@${dependencyVersion}`;

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

                let libIndex = flashistLibNames.indexOf(curLibName);
                let tempLibName = flashistLibNames[libIndex];

                // Installing dependencies for the lib
                if (libIndex > 0) {
                    for (let dependencyIndex = libIndex - 1; dependencyIndex < libIndex; dependencyIndex++) {
                        let tempDependencyName = flashistLibNames[dependencyIndex];
                        await installDependencyTo(tempLibName, tempDependencyName);
                    }
                }

                resolve();
            }
        );
    }
);

// EXPORTS
exports.dependencyLibNames = flashistLibNames;
exports.libNamesConvertedToChoices = libNamesConvertedToChoices;
exports.chooseLibName = chooseLibName;
exports.getLibFolderNameFromLibName = getLibFolderNameFromLibName;