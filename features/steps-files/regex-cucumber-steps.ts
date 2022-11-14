import { Given, Then, When } from 'cucumber';

Given(/Given regex/, () => {});
When(/When regex/, () => {});
Then(/Then regex/, () => {});

Given(/Given regex with \/slashes\//, () => {});
When(/When regex with \/slashes\//, () => {});
Then(/Then regex with \/slashes\//, () => {});

// prettier-ignore
Given(/Given regex with slashes after the step/, () => { console.log(/More/, /slashes/); });
// prettier-ignore
When(/When regex with slashes after the step/, () => { console.log(/More/, /slashes/); });
// prettier-ignore
Then(/Then regex with slashes after the step/, () => { console.log(/More/, /slashes/); });
