import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { resolve } from 'path';
import { ICucumberDataTable, ICucumberStep } from '../../types';
import { getFileCucumberSteps, getFolderCucumberSteps } from '../cucumber-step';

let filePath: string;
let folderPath: string;
let cucumberSteps: ICucumberStep[];

const flattenArray = (array: string[][]) => {
    return array.reduce((flattened, next) => flattened.concat(next), []);
};

Given(/^the file "([^.]+\.ts)" \(inside the steps-files folder\)$/, (fileName: string) => {
    filePath = resolve(__dirname, '..', '..', '..', 'features', 'steps-files', fileName);
});

Given(/^the folder "(.*)" \(inside the steps-files folder\)$/, function(folderName: string) {
    folderPath = resolve(__dirname, '..', '..', '..', 'features', 'steps-files', folderName);
});

When(/^the cucumber steps defined in the file are required$/, () => {
    cucumberSteps = getFileCucumberSteps(filePath);
});

When(/^the cucumber steps defined in the folder are required$/, () => {
    cucumberSteps = getFolderCucumberSteps(folderPath);
});

When(/^the cucumber steps defined in the folder are required without recursion$/, () => {
    cucumberSteps = getFolderCucumberSteps(folderPath, { recursive: false });
});

When(
    /^the cucumber steps defined in the folder are required with "(.*)" filename RegExp$/,
    (filenameRegExp: string) => {
        cucumberSteps = getFolderCucumberSteps(folderPath, {
            filenameRegExp
        });
    }
);

Then('no cucumber steps are returned', () => {
    expect(cucumberSteps.map(s => s.text)).to.deep.equal([]);
});

Then('the following cucumber steps are returned', (dataTable: ICucumberDataTable) => {
    const expectedCucumberSteps = flattenArray(dataTable.rawTable);
    expect(cucumberSteps.map(s => s.text)).to.deep.equal(expectedCucumberSteps);
});

Then('the following cucumber steps are returned, with arguments', (dataTable: ICucumberDataTable) => {
    const expectedCucumberSteps = dataTable.rawTable.map(line => ({
        arguments: line[1] && line[1].split(',').map(x => x.trim()) || [],
        text: line[0],
    }));
    const actualCucumberSteps = cucumberSteps.map(s => ({
        arguments: s.arguments,
        text: s.text
    }));
    expect(actualCucumberSteps).to.deep.equal(expectedCucumberSteps);
});

Then('the following cucumber steps are returned, with jsDoc tags', (dataTable: ICucumberDataTable) => {
    const expectedCucumberSteps = dataTable.rawTable.map(line => ({
        jsDocTags: line[1] && line[1].split(',').map(x => x.trim()) || [],
        text: line[0],
    }));
    const actualCucumberSteps = cucumberSteps.map(s => ({
        jsDocTags: s.jsDocTags,
        text: s.text
    }));
    expect(actualCucumberSteps).to.deep.equal(expectedCucumberSteps);
});

