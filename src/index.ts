import * as fs from 'fs';

export const getCucumberSentencesFromContent = (content: string): string[] => {
    const lines = content.split(/\r?\n/);
    return lines;
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
