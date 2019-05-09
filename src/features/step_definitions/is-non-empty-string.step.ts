import { When, Then } from 'cucumber';
import { isNonEmptyString } from '../../index';
import { assert } from 'chai';

let result: boolean;

When(/^filtering the "(.*)" string$/, function(input: string) {
    result = isNonEmptyString(input);
});

Then(/^the returned result should be "(.*)"$/, function(output: string) {
    assert.equal(output, String(result));
});
