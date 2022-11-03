Feature: Cucumber steps file parsing

   The parser should correctly retrieve the cucumber steps defined
   inside Given, When or Then calls for a given file

   Scenario: Single quote cucumber steps
      Given the file "single-quote-cucumber-steps.ts" (inside the steps-files folder)
      When the cucumber steps defined in the file are required
      Then the following cucumber steps are returned
         | Given single quote string                                       |
         | When single quote string                                        |
         | Then single quote string                                        |
         | Given single quote string with 'single quotes'                  |
         | When single quote string with 'single quotes'                   |
         | Then single quote string with 'single quotes'                   |
         | Given single quote string with single quotes after the step     |
         | When single quote string with single quotes after the step      |
         | Then single quote string with single quotes after the step      |

   Scenario: Double quote cucumber steps
      Given the file "double-quote-cucumber-steps.ts" (inside the steps-files folder)
      When the cucumber steps defined in the file are required
      Then the following cucumber steps are returned
         | Given double quote string                                       |
         | When double quote string                                        |
         | Then double quote string                                        |
         | Given double quote string with "double quotes"                  |
         | When double quote string with "double quotes"                   |
         | Then double quote string with "double quotes"                   |
         | Given double quote string with double quotes after the step     |
         | When double quote string with double quotes after the step      |
         | Then double quote string with double quotes after the step      |

   Scenario: Template literal cucumber steps
      Given the file "template-literal-cucumber-steps.ts" (inside the steps-files folder)
      When the cucumber steps defined in the file are required
      Then the following cucumber steps are returned
         | Given template literal string                                     |
         | When template literal string                                      |
         | Then template literal string                                      |
         | Multiline\nGiven template literal string                          |
         | Multiline\nWhen template literal string                           |
         | Multiline\nThen template literal string                           |
         | Given template literal string with `back sticks`                  |
         | When template literal string with `back sticks`                   |
         | Then template literal string with `back sticks`                   |
         | Given template literal string with back sticks after the step     |
         | When template literal string with back sticks after the step      |
         | Then template literal string with back sticks after the step      |

   Scenario: RegEx cucumber steps
      Given the file "regex-cucumber-steps.ts" (inside the steps-files folder)
      When the cucumber steps defined in the file are required
      Then the following cucumber steps are returned
         | Given regex                                 |
         | When regex                                  |
         | Then regex                                  |
         | Given regex with \/slashes\/                |
         | When regex with \/slashes\/                 |
         | Then regex with \/slashes\/                 |
         | Given regex with slashes after the step     |
         | When regex with slashes after the step      |
         | Then regex with slashes after the step      |

   Scenario: Separate line cucumber steps
      Given the file "separate-line-cucumber-steps.ts" (inside the steps-files folder)
      When the cucumber steps defined in the file are required
      Then the following cucumber steps are returned
         | Given double quote string in a separate line     |
         | When double quote string in a separate line      |
         | Then double quote string in a separate line      |
         | Given single quote string in a separate line     |
         | When single quote string in a separate line      |
         | Then single quote string in a separate line      |
         | Given template literal string in a separate line |
         | When template literal string in a separate line  |
         | Then template literal string in a separate line  |
         | Given regex in a separate line                   |
         | When regex in a separate line                    |
         | Then regex in a separate line                    |

   Scenario: Commented cucumber steps
      Given the file "commented-cucumber-steps.ts" (inside the steps-files folder)
      When the cucumber steps defined in the file are required
      Then no cucumber steps are returned

   Scenario: Cucumber steps with arguments
      Given the file "arguments-cucumber-steps.ts" (inside the steps-files folder)
      When the cucumber steps defined in the file are required
      Then the following cucumber steps are returned, with arguments
         | Given string step with function arguments {string}       | myString |
         | When string step with function arguments {string}        | myString |
         | Then string step with function arguments {string}        | myString |
         | Given string step with arrow function arguments {string} | myString |
         | When string step with arrow function arguments {string}  | myString |
         | Then string step with arrow function arguments {string}  | myString |
         | Given regex step with function arguments ".*"            | myString |
         | When regex step with function arguments ".*"             | myString |
         | Then regex step with function arguments ".*"             | myString |
         | Given regex step with arrow function arguments ".*"      | myString |
         | When regex step with arrow function arguments ".*"       | myString |
         | Then regex step with arrow function arguments ".*"       | myString |

   Scenario: Cucumber steps with jsDoc tags
      Given the file "js-doc-cucumber-steps.ts" (inside the steps-files folder)
      When the cucumber steps defined in the file are required
      Then the following cucumber steps are returned, with jsDoc tags
         | Given annotated step {string}    | deprecated, param, returns  |
         | When annotated step {string}     | deprecated, param, returns  |
         | Then annotated step {string}     | deprecated, param, returns  |
