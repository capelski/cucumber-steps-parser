import { existsSync, lstatSync } from 'fs';
import { argv } from 'yargs';
import { getFileCucumberSteps, getFolderCucumberSteps } from './logic';

const path = argv._[0];
const recursive = argv.recursive as string | undefined !== 'false';
const filenameRegExp = argv.filenameRegExp as string | undefined;

if (!path) {
    console.log(`Usage: cucumber-steps-parser <path> [--recursive <true | false>] [--filenameRegExp <filename_regex>]
E.g. cucumber-steps-parser path/to/your/project`);
    process.exit(1);
} else {
    try {
        if (!existsSync(path)) {
            console.log(`No directory or file was found at ${path}`);
            process.exit(1);
        }

        const cucumberSteps = lstatSync(path).isDirectory()
            ? getFolderCucumberSteps(path, {
                  filenameRegExp,
                  recursive
              })
            : getFileCucumberSteps(path);
        console.log(JSON.stringify(cucumberSteps, null, 4));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
