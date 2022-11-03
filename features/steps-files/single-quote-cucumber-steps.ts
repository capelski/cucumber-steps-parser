import { Given, Then, When } from 'cucumber';

Given('Given single quote string', () => {});
When('When single quote string', () => {});
Then('Then single quote string', () => {});

// prettier-ignore
Given('Given single quote string with \'single quotes\'', () => {});
// prettier-ignore
When('When single quote string with \'single quotes\'', () => {});
// prettier-ignore
Then('Then single quote string with \'single quotes\'', () => {});

// prettier-ignore
Given('Given single quote string with single quotes after the step', () => { console.log('More', 'single quotes'); });
// prettier-ignore
When('When single quote string with single quotes after the step', () => { console.log('More', 'single quotes'); });
// prettier-ignore
Then('Then single quote string with single quotes after the step', () => { console.log('More', 'single quotes'); });
