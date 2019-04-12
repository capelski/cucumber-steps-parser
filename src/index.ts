import * as fs from 'fs';

const emptyStringRegex = /^\s*\n?$/;
const cucumberSentenceRegex = /^\s*(Given|When|Then)\(['"\/](.*)['"\/],.*$/;

// TODO Individually test this function with cucumber
/*
    [ null, undefined, '', '           ', '           \n', 'test', '     test']
 */
export const removeEmptyStrings = (strings: string[]) =>
    strings.filter(_string => _string && !emptyStringRegex.test(_string));

// TODO Individually test this function with cucumber
/*
    ['   ', ' test', '        test         ', 'test          ']
 */
export const trimStrings = (strings: string[]) => strings.map(line => line.trim());

export const getCucumberSentencesFromContent = (content: string): string[] => {
    const lines = content.split(/\r?\n/);
    const nonEmptyLines = removeEmptyStrings(lines);
    const trimmedLines = trimStrings(nonEmptyLines);
    const cucumberSentences = trimmedLines.reduce((cucumberSentences, nextLine) => {
        const cucumberMatch = nextLine.match(cucumberSentenceRegex);
        if (cucumberMatch) {
            const cucumberSentence = cucumberMatch[2];
            cucumberSentences = cucumberSentences.concat(cucumberSentence);
        }
        return cucumberSentences;
    }, [] as string[]);

    return cucumberSentences;
};

export const getCucumberSentencesFromFile = (filePath: string): string[] => {
    let sentences: string[] = [];
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        sentences = getCucumberSentencesFromContent(fileContent);
    } catch (error) {
        console.error(`Error reading the file at ${filePath}`, error);
    }
    return sentences;
};
