import { Given, Then, When } from 'cucumber';

/**
 * @deprecated
 * @param string
 * @returns
 */
Given(/Given annotated step {string}/, (myString: string) => { console.log(myString) });

/**
 * @deprecated
 * @param string
 * @returns
 */
When(/When annotated step {string}/, (myString: string) => { console.log(myString) });

/**
 * @deprecated
 * @param string
 * @returns
 */
Then(/Then annotated step {string}/, (myString: string) => { console.log(myString) });
