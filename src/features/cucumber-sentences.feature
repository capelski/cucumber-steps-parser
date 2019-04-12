Feature: Cucumber sentences parsing

   The parser should correctly retrieve the cucumber sentences defined inside Given, When or Then calls

   Scenario: Simple Cucumber syntax sentences
      When requiring the cucumber sentences contained in the file "../../test-data/simple-cucumber-syntax.ts"
      Then the returned cucumber sentences should be:
         | cucumber single quote string given sample |
         | cucumber single quote string when sample |
         | cucumber single quote string then sample |
         | cucumber double quote string given sample |
         | cucumber double quote string when sample |
         | cucumber double quote string then sample |