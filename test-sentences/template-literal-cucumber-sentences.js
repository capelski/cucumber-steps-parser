import { Given, When, Then } from 'cucumber';

// prettier-ignore
Given(`Given template literal string`, () => {});
// prettier-ignore
When(`When template literal string`, () => {});
// prettier-ignore
Then(`Then template literal string`, () => {});

// prettier-ignore
Given(`Given template literal string with \`back sticks\``, () => {});
// prettier-ignore
When(`When template literal string with \`back sticks\``, () => {});
// prettier-ignore
Then(`Then template literal string with \`back sticks\``, () => {});

// prettier-ignore
Given(`Given template literal string with back sticks after the sentence`, () => { console.log(`More`, `back sticks`); });
// prettier-ignore
When(`When template literal string with back sticks after the sentence`, () => { console.log(`More`, `back sticks`); });
// prettier-ignore
Then(`Then template literal string with back sticks after the sentence`, () => { console.log(`More`, `back sticks`); });
