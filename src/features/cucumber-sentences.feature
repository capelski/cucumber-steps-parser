Feature: Cucumber sentences parsing

   The parser should correctly retrieve the cucumber sentences defined inside Given, When or Then calls

   Scenario: Simple Cucumber syntax sentences
      When requiring the cucumber sentences contained in the file "../../test-data/simple-cucumber-syntax-sentences.ts"
      Then the returned cucumber sentences should be:
         | cucumber single quote string given sample |
         | cucumber single quote string when sample |
         | cucumber single quote string then sample |
         | cucumber double quote string given sample |
         | cucumber double quote string when sample |
         | cucumber double quote string then sample |
         | cucumber single quote string with " given sample |
         | cucumber single quote string with " when sample |
         | cucumber single quote string with " then sample |
         | cucumber double quote string with ' given sample |
         | cucumber double quote string with ' when sample |
         | cucumber double quote string with ' then sample |

   Scenario: Simple RegEx sentences
      When requiring the cucumber sentences contained in the file "../../test-data/simple-regex-sentences.ts"
      Then the returned cucumber sentences should be:
         | regex given sample |
         | regex when sample |
         | regex then sample |
