import { When, Then } from 'cucumber';
import path from 'path';
import { getCucumberSentencesFromFile } from '../../index';
import { assert } from 'chai';

let cucumberSentences: string[];

const flattenArray = (array: (any[])[]) => {
    return array.reduce((flattened, next) => flattened.concat(next), []);
};

When(/^requiring the cucumber sentences contained in the file "(.*)"$/, function(filePath: string) {
    filePath = path.resolve(__dirname, '..', filePath);
    cucumberSentences = getCucumberSentencesFromFile(filePath);
});

Then(/^the returned cucumber sentences should be:$/, function(dataTable) {
    const expectedSentences = flattenArray(dataTable.rawTable);
    assert.equal(cucumberSentences, expectedSentences);
});
