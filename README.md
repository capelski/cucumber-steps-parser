# cucumber-steps-parser

So you are using [cucumber.js](https://github.com/cucumber/cucumber-js) to test your Typescript project in a BDD fashion. That's a great choice! :tada: However, as the project grows, you start to have problems to remember all the step definitions you have created when writing new feature tests.

Here is where cucumber-steps-parser might come handy for you. This simple utility crawls a file or folder and looks for all the existing step definitions. Easy as that!

You can use it inside your application:

```javascript
const { getFolderCucumberSentences } = require('cucumber-steps-parser');
const sentences = getFolderCucumberSentences('path/to/your/project');
console.log(sentences);
```

And you can also run it from the terminal:

```bash
npm install --global cucumber-steps-parser
cucumber-steps-parser path/to/your/project
```

#### Remarks

-   **Recursive crawling**: If you want cucumber-steps-parser to check subfolders, you must pass true as second parameter to the getFolderCucumberSentences function
-   **File naming convention**: By default, cucumber-steps-parser will only check files named \<file-name\>.step.ts. If you are using a different naming convention, you mast pass a regex as third parameter to the getFolderCucumberSentences function

```javascript
const { getFolderCucumberSentences } = require('cucumber-steps-parser');

const recursiveCrawling = true;
const stepDefinitionsFilenames = /.*\.ts$/;
const sentences = getFolderCucumberSentences(
    'path/to/your/project',
    recursiveCrawling,
    stepDefinitionsFilenames
);
```

Have fun!
