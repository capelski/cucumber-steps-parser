Feature: Cucumber sentences parsing

   The parser should correctly retrieve the cucumber sentences defined inside Given, When or Then calls

   Scenario: Simple Cucumber syntax sentences
      When requiring the cucumber sentences contained in the file "../../test-data/simple-cucumber-syntax.ts"
      Then the returned cucumber sentences should be:
         | cucumber string given sample |
         | cucumber string when sample |
         | cucumber string then sample   |