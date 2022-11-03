import { Given, Then, When } from 'cucumber';

Given('Given string step with function arguments {string}', function (myString: string) { console.log(myString) });
When('When string step with function arguments {string}', function (myString: string) { console.log(myString) });
Then('Then string step with function arguments {string}', function (myString: string) { console.log(myString) });

Given('Given string step with arrow function arguments {string}', (myString: string) => { console.log(myString) });
When('When string step with arrow function arguments {string}', (myString: string) => { console.log(myString) });
Then('Then string step with arrow function arguments {string}', (myString: string) => { console.log(myString) });

Given(/Given regex step with function arguments ".*"/, function (myString: string) { console.log(myString) });
When(/When regex step with function arguments ".*"/, function (myString: string) { console.log(myString) });
Then(/Then regex step with function arguments ".*"/, function (myString: string) { console.log(myString) });

Given(/Given regex step with arrow function arguments ".*"/, (myString: string) => { console.log(myString) });
When(/When regex step with arrow function arguments ".*"/, (myString: string) => { console.log(myString) });
Then(/Then regex step with arrow function arguments ".*"/, (myString: string) => { console.log(myString) });
