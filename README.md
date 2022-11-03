# cucumber-steps-parser

So you are using [cucumber.js](https://github.com/cucumber/cucumber-js) to test your Typescript project in a BDD fashion. That's a great choice! :tada: You might, however, struggle to remember all your step definitions when writing new feature tests. Here is where `cucumber-steps-parser` might come handy for you!

This simple utility parses a file or folder and finds all the existing step definitions. You can then use IDE extensions (i.e. [alexkrechik.cucumberautocomplete](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)) to get autocomplete suggestions when writing feature tests.

## Usage

`cucumber-steps-parser` is available via both node.js Api and command line interface:

**CLI**

```bash
npm install --global cucumber-steps-parser
cucumber-steps-parser path/to/your/project
```

**node.js**

```javascript
const { getFolderCucumberSteps } = require('cucumber-steps-parser');
const cucumberSteps = getFolderCucumberSteps('path/to/your/project');
```

In both cases, the result will be a list of cucumber steps with the following properties:

| Name      | Type       | Description                                                                                    |
| --------- | ---------- | ---------------------------------------------------------------------------------------------- |
| arguments | `string[]` | List of arguments declared in the cucumber step implementation                                 |
| jsDocTags | `string[]` | List of tags used in the jsDoc annotation of the cucumber step                                 |
| rawText   | `string`   | The cucumber step sentence as stated in the definition file (i.e. including regexp characters) |
| text      | `string`   | The cucumber step sentence as it will be used in feature tests                                 |

## Options

You can change how `cucumber-steps-parser` finds the step definition files in your application through the following configuration parameters:

-   **filenameRegExp**: Only the filenames matching this regular expression will be parsed. Defaults to typescript files only (i.e. `/^.*\.ts$/`)
-   **recursive**: Whether the folders found in the given path are recursively crawled. Defaults to **true**

```bash
cucumber-steps-parser path/to/your/project --recursive false --filenameRegExp "^.*\.step\.ts$"
```

```javascript
const { getFolderCucumberSteps } = require('cucumber-steps-parser');
const cucumberSteps = getFolderCucumberSteps('path/to/your/project', {
    filenameRegExp: /^.*\.step\.ts$/,
    recursive: false
});
```

## Example

Given the following sample definition file (i.e. `my-logic.step.ts`)

```typescript
import { Given } from 'cucumber';

Given(/^my parametrized cucumber step {string}$/, (myString: string) => {
    return 'pending';
});

When(/^yet another parametrized step "([0-9]*)"$/, (myNumber: number) => {
    return 'pending';
});

/**
 * @deprecated
 */
Then('once upon a time... in Hollywood', () => {
    return 'pending';
});
```

the following cucumber steps will be returned when parsing it (i.e. `cucumber-steps-parser ./my-logic.step.ts`):

```json
[
    {
        "arguments": [
            "myString"
        ],
        "jsDocTags": [],
        "rawText": "/^my parametrized cucumber step {string}$/",
        "text": "my parametrized cucumber step {string}"
    },
    {
        "arguments": [
            "myNumber"
        ],
        "jsDocTags": [],
        "rawText": "/^yet another parametrized step \"([0-9]*)\"$/",
        "text": "yet another parametrized step \"([0-9]*)\""
    },
    {
        "arguments": [
            "myNumber"
        ],
        "jsDocTags": [
            "deprecated"
        ],
        "rawText": "once upon a time... in Hollywood",
        "text": "once upon a time... in Hollywood"
    }
];
```
