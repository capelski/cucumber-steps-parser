# cucumber-steps-parser

So you are using [cucumber.js](https://github.com/cucumber/cucumber-js) to test your Typescript project in a BDD fashion. That's a great choice! :tada: However, as the project grows, you start to have problems to remember all the step definitions you have created when writing new feature tests.

Here is where cucumber-steps-parser might come handy for you. This simple utility crawls a file or folder and looks for all the existing step definitions. Easy as that!

You can use it inside your application:

```javascript
const { getFolderCucumberSentences } = require('cucumber-steps-parser');
const sentences = getFolderCucumberSentences('path/to/your/project');
```

And you can also run it from the terminal:

```bash
npm install --global cucumber-steps-parser
cucumber-steps-parser path/to/your/project
```

### Options

You can customize how cucumber-steps-parser finds the step definition files in your application through the following configuration parameters:

-   **recursive**: Whether the folders found in the given path are recursively crawled. Defaults to true
-   **filenameRegExp**: Only the filenames matching this regular expression will be parsed. Defaults to typescript files only (`/^.*\.ts$/`)

```javascript
const { getFolderCucumberSentences } = require('cucumber-steps-parser');
const sentences = getFolderCucumberSentences('path/to/your/project', {
    recursive: false,
    filenameRegExp: /^.*\.step\.ts$/
});
```

Have fun!
