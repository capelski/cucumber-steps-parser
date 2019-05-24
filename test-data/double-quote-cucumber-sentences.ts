import { Given, When, Then } from 'cucumber';

// prettier-ignore
Given("Given double quote string", () => {});
// prettier-ignore
When("When double quote string", () => {});
// prettier-ignore
Then("Then double quote string", () => {});

// prettier-ignore
Given("Given double quote string with \"double quotes\"", () => {});
// prettier-ignore
When("When double quote string with \"double quotes\"", () => {});
// prettier-ignore
Then("Then double quote string with \"double quotes\"", () => {});

// prettier-ignore
Given("Given double quote string with double quotes after the sentence", () => { console.log("More", "double quotes"); });
// prettier-ignore
When("When double quote string with double quotes after the sentence", () => { console.log("More", "double quotes"); });
// prettier-ignore
Then("Then double quote string with double quotes after the sentence", () => { console.log("More", "double quotes"); });
