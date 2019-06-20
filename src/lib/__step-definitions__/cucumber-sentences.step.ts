import { assert } from 'chai';
import { When, Then, Given } from 'cucumber';
import { resolve } from 'path';
import { getCucumberSentences } from '../cucumber-sentences';

let filePath: string;
let sentences: string[];

const flattenArray = (array: (any[])[]) => {
    return array.reduce((flattened, next) => flattened.concat(next), []);
};

Given(/^the file "([^.]+\.ts)" \(inside the sentences-files folder\)$/, function(fileName: string) {
    filePath = resolve(__dirname, '..', '..', '..', 'features', 'sentences-files', fileName);
});

When(/^the cucumber sentences defined in the file are required$/, function() {
    sentences = getCucumberSentences(filePath);
});

Then(/^no cucumber sentences are returned$/, function() {
    assert.deepEqual(sentences, []);
});

Then(/^the following cucumber sentences are returned$/, function(dataTable) {
    const expectedSentences = flattenArray(dataTable.rawTable);
    assert.deepEqual(sentences, expectedSentences);
});
