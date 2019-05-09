import * as fs from 'fs';

const emptyStringRegex = /^\s*\n?$/;
const cucumberSentenceRegex = /^\s*(Given|When|Then)\(['"\/](.*)['"\/],.*$/;

export const isNonEmptyString = (_string: string) =>
    !!_string && !emptyStringRegex.test(_string);

export const getCucumberSentencesFromContent = (content: string): string[] => {
    const lines = content.split(/\r?\n/);
    const nonEmptyLines = lines.filter(isNonEmptyString);
    const trimmedLines = nonEmptyLines.map(line => line.trim());
    const cucumberSentences = trimmedLines.reduce((cucumberSentences, nextLine) => {
        const cucumberMatch = nextLine.match(cucumberSentenceRegex);
        if (cucumberMatch) {
            const cucumberSentence = cucumberMatch[2];
            cucumberSentences.push(cucumberSentence);
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
