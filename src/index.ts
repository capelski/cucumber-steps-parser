import * as fs from 'fs';

const emptyStringRegex = /^\s*\n?$/;
const simpleCucumberRegexs = [
    /(Given|When|Then)\('([^']*)',/,
    /(Given|When|Then)\("([^"]*)",/,
    /(Given|When|Then)\(`([^`]*)`,/,
    /(Given|When|Then)\(\/([^\/]*)\/,/
];
const escapedCucumberRegexs = [
    /(Given|When|Then)\('(([^']*(\\')?)*)'\s*,/,
    /(Given|When|Then)\("(([^"]*(\\")?)*)"\s*,/,
    /(Given|When|Then)\(`(([^`]*(\\`)?)*)`\s*,/,
    /(Given|When|Then)\(\/(([^\/]*(\\\/)?)*)\/\s*,/
];

const getCucumberRegexMatch = (cucumberRegexs: RegExp[], target: string) => {
    const match = cucumberRegexs.reduce(
        (reduced, regex) => reduced || target.match(regex),
        undefined as RegExpMatchArray
    );
    return match && match[2];
};

export const isNonEmptyString = (_string: string) => !!_string && !emptyStringRegex.test(_string);

export const getCucumberSentencesFromContent = (content: string): string[] => {
    const lines = content.split(/\r?\n/);
    const nonEmptyLines = lines.filter(isNonEmptyString);
    const trimmedLines = nonEmptyLines.map(line => line.trim());
    const cucumberSentences = trimmedLines.reduce(
        (cucumberSentences, nextLine) => {
            const sentenceContent =
                getCucumberRegexMatch(simpleCucumberRegexs, nextLine) ||
                getCucumberRegexMatch(escapedCucumberRegexs, nextLine);
            if (sentenceContent) {
                cucumberSentences.push(sentenceContent);
            }
            return cucumberSentences;
        },
        [] as string[]
    );

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
