var gulp = require("gulp");
const prompts = require('prompts');

gulp.task(
    "prompts-choose-task",
    async (cb) => {

        const taskNamesToSkip = ["default"];

        // Preparing the list of all available gulp tasks
        const allGulpTasks = gulp.registry().tasks();
        // Outputs a JS object: { <task name>: <function>, ...}
        const allGulpTaskNames = Object.keys(allGulpTasks);
        const allGulpTaskPromptSuggestions = allGulpTaskNames.filter(
            (value) => {
                let result = true;
                if (taskNamesToSkip.indexOf(value) !== -1) {
                    result = false;
                }

                return result;
            }
        ).map(
            (value) => {
                return {
                    title: value
                };
            }
        );

        const allNpmScriptNamesPromptSuggestions = [];
        //
        const promptsConfig = {
            type: 'autocomplete',
            name: 'value',
            message: 'Choose gulp task to run',
            choices: [...allNpmScriptNamesPromptSuggestions, ...allGulpTaskPromptSuggestions],
            limit: 15,
            suggest: suggestByAutocompleteScore
        };

        const response = await prompts(promptsConfig);
        console.log("response: ", response);
        if (response.value.indexOf("npm run") !== -1) {
            // run(response.value).exec([], cb);
            const tempCmd = new run.Command('npm run build:prod', { verbosity: 3 });
            tempCmd.exec('', () => { cb(); });

        } else {
            gulp.task(response.value)(
                () => {
                    // console.log("END gulp.task");
                    cb();
                }
            );
        }

        // console.log(gulp);
    }
);

//

const chooseFolder = async (parentFolderPath) => {
    const listOfFolderNames = fs.readdirSync(parentFolderPath, { withFileTypes: true })
        .filter((element) => { return element.isDirectory() })
        .map((element) => { return { title: element.name } });
    // Add empty selection, to choose the current folder, without subfolders
    const curFolderTitleName = "==CURRENT FOLDER==";
    listOfFolderNames.unshift({ title: curFolderTitleName })

    const targetFolderResponse = await prompts({
        type: 'autocomplete',
        name: 'value',
        message: 'Choose folder to generate config for',
        choices: listOfFolderNames,
        limit: 15,
        suggest: suggestByAutocompleteScore
    });

    let result = parentFolderPath;
    // If subfolder was chosen to the same choosing for the subfolder
    if (targetFolderResponse.value && targetFolderResponse.value !== curFolderTitleName) {
        const chosenFolderPath = path.join(parentFolderPath, targetFolderResponse.value);
        const hasSubfolders = checkIfHasSubFolders(chosenFolderPath);
        if (hasSubfolders) {
            result = await chooseFolder(chosenFolderPath);
        } else {
            result = chosenFolderPath;
        }
    }

    return result;
}

const checkIfHasSubFolders = (path) => {
    const listOfFolders = fs.readdirSync(path, { withFileTypes: true })
        .filter((element) => { return element.isDirectory() })

    let result = false;
    if (listOfFolders.length > 0) {
        result = true;
    }

    return result;
}

const suggestByAutocompleteScore = async (input, choices) => {

    let result = choices.concat();
    // console.log("result: ", result);
    if (input) {
        let atLeastOneFullInputMatch = false;

        const choicesCount = result.length;
        for (let choiceIndex = 0; choiceIndex < choicesCount; choiceIndex++) {
            const tempChoice = result[choiceIndex];
            tempChoice.autocompleteScore = 0;

            tempChoice.isFullInputMatch = false;
            const fullInputIndex = tempChoice.title.indexOf(input);
            if (fullInputIndex !== -1) {
                tempChoice.autocompleteScore = Number.MAX_SAFE_INTEGER;
                tempChoice.autocompleteScore -= fullInputIndex;
                tempChoice.isFullInputMatch = true;

                atLeastOneFullInputMatch = true;

            } else {
                const inputLettersCount = input.length;
                for (let inputLetterIndex = 0; inputLetterIndex < inputLettersCount; inputLetterIndex++) {
                    const tempLetter = input.charAt(inputLetterIndex);
                    if (tempChoice.title.indexOf(tempLetter) !== -1) {
                        tempChoice.autocompleteScore++;
                    }
                }
            }
        }

        if (atLeastOneFullInputMatch) {
            result = result.filter(
                (item) => {
                    return item.isFullInputMatch;
                }
            )
        }

        result = result.filter((item) => item.autocompleteScore > 0);
        result.sort((item1, item2) => item2.autocompleteScore - item1.autocompleteScore);
    }

    return result;
}