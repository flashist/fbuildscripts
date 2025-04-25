var gulp = require("gulp");
var exec = require("child_process").exec;

gulp.task(
    "npm:publish:patch",
    (cb) => {
        return exec('npm version patch && gulp build && cd ./dist && npm publish',
            function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                cb(err); var gulp = require("gulp");
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
                    "npm:dependencies:hard-reset",
                    async (u) => {

                        await removeNodeModules();
                        await removePackageLock();

                        await new Promise(
                            (resolve) => {
                                console.log("Installing all dependencies");
                                exec(`npm i --no-save`,
                                    function (err, stdout, stderr) {
                                        if (err) {
                                            console.error(err);
                                        }

                                        resolve();
                                    }
                                );
                            }
                        );
                    }
                );

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

                        await removePackageLock();

                        const packageJson = JSON.parse(fs.readFileSync('./package.json'));

                        const allDependencyKeys = [];
                        if (packageJson.dependencies) {
                            allDependencyKeys.push(...Object.keys(packageJson.dependencies));
                        }
                        if (packageJson.devDependencies) {
                            allDependencyKeys.push(...Object.keys(packageJson.devDependencies));
                        }

                        for (let singleDependencyKey of allDependencyKeys) {
                            if (singleDependencyKey.indexOf("@flashist") !== -1) {
                                await updateLibToVersion(singleDependencyKey, "latest");
                            }
                        }

                        // const libNamesCount = dependencyLibNames.length;
                        // for (let libNameIndex = 0; libNameIndex < libNamesCount; libNameIndex++) {
                        //     const singleLibName = dependencyLibNames[libNameIndex];
                        //     await updateLibToVersion(singleLibName, "latest");
                        // }
                    }
                );



                var removePackageLock = async () => {
                    console.log("Removing the package-lock file");
                    if (fs.existsSync('./package-lock.json')) {
                        fs.unlinkSync('./package-lock.json');
                    }
                }

                var removeNodeModules = async () => {
                    console.log("Removing the node_modules folder");
                    if (fs.existsSync('./node_modules')) {
                        fs.rmSync('./node_modules', { recursive: true, force: true });
                    }
                }

                var updateLibToVersion = async (libName, version) => {
                    const dependencyVersion = `${libName}@${version}`;
                    console.log("Installing a module: ", dependencyVersion);
                    await new Promise(
                        (resolve) => {
                            exec(`npm i ${dependencyVersion} --no-save`,
                                function (err, stdout, stderr) {
                                    if (err) {
                                        console.error(err);
                                    }

                                    resolve();
                                }
                            );
                        }
                    );
                }
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