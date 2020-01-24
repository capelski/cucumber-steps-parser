import { argv } from 'yargs';
import { getFolderCucumberSentences } from './lib/cucumber-sentences';

const path = argv._[0] as string | undefined;
const recursive = argv.recursive as boolean | undefined;
const filenameRegExp = argv.filename as string | undefined;

if (!path) {
    console.log(`Usage: cucumber-steps-parser <path> [--no-recursive] [--filename <filename_regex>]
E.g. cucumber-steps-parser /c/company-name/project`);
    process.exit(1);
} else {
    try {
        const sentences = getFolderCucumberSentences(path, {
            filenameRegExp,
            recursive
        });
        console.log(sentences);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
