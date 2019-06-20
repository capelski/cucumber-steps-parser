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

When(/^requiring the cucumber sentences defined in the file$/, function() {
    sentences = getCucumberSentences(filePath);
});

Then(/^the following cucumber sentences should be returned$/, function(dataTable) {
    const expectedSentences = flattenArray(dataTable.rawTable);
    assert.deepEqual(sentences, expectedSentences);
});
