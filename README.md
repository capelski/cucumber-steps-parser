# cucumber-steps-parser

So you are using [cucumber.js](https://github.com/cucumber/cucumber-js) to test your Typescript project in a BDD fashion. That's a great choice! :tada: However, as the project grows, you start to have problems to remember all the step definitions you have created when writing new feature tests.

Here is where cucumber-steps-parser might come handy for you. This simple utility recursively crawls a folder and looks for all the existing step definitions. Easy as that!

You can either run it from the terminal:

```bash
npm install --global cucumber-steps-parser
cucumber-steps-parser path/to/your/project
```

Or use it from your application:

```javascript
const { getFolderCucumberSentences } = require('cucumber-steps-parser');
const sentences = getFolderCucumberSentences('path/to/your/project', true);
console.log(sentences);
```

Have fun!
