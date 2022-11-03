import { Given, Then, When } from 'cucumber';

// prettier-ignore
Given(`Given template literal string`, () => {});
// prettier-ignore
When(`When template literal string`, () => {});
// prettier-ignore
Then(`Then template literal string`, () => {});

// prettier-ignore
Given(`Multiline
Given template literal string`, () => {});
// prettier-ignore
When(`Multiline
When template literal string`, () => {});
// prettier-ignore
Then(`Multiline
Then template literal string`, () => {});

// prettier-ignore
Given(`Given template literal string with \`back sticks\``, () => {});
// prettier-ignore
When(`When template literal string with \`back sticks\``, () => {});
// prettier-ignore
Then(`Then template literal string with \`back sticks\``, () => {});

// prettier-ignore
Given(`Given template literal string with back sticks after the step`, () => { console.log(`More`, `back sticks`); });
// prettier-ignore
When(`When template literal string with back sticks after the step`, () => { console.log(`More`, `back sticks`); });
// prettier-ignore
Then(`Then template literal string with back sticks after the step`, () => { console.log(`More`, `back sticks`); });
