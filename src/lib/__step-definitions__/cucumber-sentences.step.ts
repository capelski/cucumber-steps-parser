import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { resolve } from 'path';
import { ICucumberStepDetails, getFileCucumberSentences, getFolderCucumberSentences } from '../cucumber-sentences';

let filePath: string;
let folderPath: string;
let sentences: ICucumberStepDetails[];

const flattenArray = (array: any[][]) => {
    return array.reduce((flattened, next) => flattened.concat(next), []);
};

Given(/^the file "([^.]+\.ts)" \(inside the sentences-files folder\)$/, (fileName: string) => {
    filePath = resolve(__dirname, '..', '..', '..', 'features', 'sentences-files', fileName);
});

Given(/^the folder "(.*)" \(inside the sentences-files folder\)$/, function (folderName: string) {
    folderPath = resolve(__dirname, '..', '..', '..', 'features', 'sentences-files', folderName);
});

When(/^the cucumber sentences defined in the file are required$/, () => {
    sentences = getFileCucumberSentences(filePath);
});

When(/^the cucumber sentences defined in the folder are required$/, () => {
    sentences = getFolderCucumberSentences(folderPath);
});

When(/^the cucumber sentences defined in the folder are required without recursion$/, () => {
    sentences = getFolderCucumberSentences(folderPath, { recursive: false });
});

When(
    /^the cucumber sentences defined in the folder are required with "(.*)" filename RegExp$/,
    (filenameRegExp: string) => {
        sentences = getFolderCucumberSentences(folderPath, {
            filenameRegExp
        });
    }
);

Then('no cucumber sentences are returned', () => {
    expect(sentences.map(s => s.text)).to.deep.equal([]);
});

Then(`the following cucumber sentences are returned`, dataTable => {
    const expectedSentences = flattenArray(dataTable.rawTable);
    expect(sentences.map(s => s.text)).to.deep.equal(expectedSentences);
});
