import * as yargs from 'yargs';
import { getFolderCucumberSentences } from './lib/cucumber-sentences';

const argv = yargs.argv;
const path: string | undefined = argv._[0];

if (!path) {
    console.log(`Usage: cucumber-steps-parser <path>
E.g. cucumber-steps-parser /c/sage/git/etna/@sage/etna-cli`);
    process.exit(1);
} else {
    try {
        // TODO Support recursive and stepDefinitionRegEx parameters
        const sentences = getFolderCucumberSentences(path);
        console.log(sentences);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
