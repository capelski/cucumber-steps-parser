// prettier-ignore
import { Given, When, Then } from 'cucumber';

// prettier-ignore
Given("double quote string given sample", () => {});
// prettier-ignore
When("double quote string when sample", () => {});
// prettier-ignore
Then("double quote string then sample", () => {});

// prettier-ignore
Given("double quote string given sample with 'single quotes'", () => { console.log("More", "quotes"); });
// prettier-ignore
When("double quote string when sample with 'single quotes'", () => { console.log("More", "quotes"); });
// prettier-ignore
Then("double quote string then sample with 'single quotes'", () => { console.log("More", "quotes"); });

// prettier-ignore
Given("double quote string given sample with \"double quotes\"", () => {});
// prettier-ignore
When("double quote string when sample with \"double quotes\"", () => {});
// prettier-ignore
Then("double quote string then sample with \"double quotes\"", () => {});
