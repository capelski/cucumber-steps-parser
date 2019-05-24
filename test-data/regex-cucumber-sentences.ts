import { Given, When, Then } from 'cucumber';

Given(/regex given sample/, () => {});
When(/regex when sample/, () => {});
Then(/regex then sample/, () => {});

// prettier-ignore
Given(/regex given sample with 'single quotes'/, () => { console.log('More', 'quotes'); });
// prettier-ignore
When(/regex when sample with 'single quotes'/, () => { console.log('More', 'quotes'); });
// prettier-ignore
Then(/regex then sample with 'single quotes'/, () => { console.log('More', 'quotes'); });

// prettier-ignore
Given(/regex given sample with "double quotes"/, () => { console.log("More", "quotes"); });
// prettier-ignore
When(/regex when sample with "double quotes"/, () => { console.log("More", "quotes"); });
// prettier-ignore
Then(/regex then sample with "double quotes"/, () => { console.log("More", "quotes"); });

Given(/regex given sample with \/slashes\//, () => {});
When(/regex when sample with \/slashes\//, () => {});
Then(/regex then sample with \/slashes\//, () => {});
