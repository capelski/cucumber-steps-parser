Feature: Cucumber sentences parsing

   The parser should correctly retrieve the cucumber sentences defined inside Given, When or Then calls

   Scenario: Single quote cucumber sentences
      When requiring the cucumber sentences contained in the file "../../test-data/single-quote-cucumber-sentences"
      Then the returned cucumber sentences should be:
         | single quote string given sample                        |
         | single quote string when sample                         |
         | single quote string then sample                         |
         | single quote string given sample with "double quotes"   |
         | single quote string when sample with "double quotes"    |
         | single quote string then sample with "double quotes"    |
         | single quote string given sample with \'single quotes\' |
         | single quote string when sample with \'single quotes\'  |
         | single quote string then sample with \'single quotes\'  |

   Scenario: Double quote cucumber sentences
      When requiring the cucumber sentences contained in the file "../../test-data/double-quote-cucumber-sentences"
      Then the returned cucumber sentences should be:
         | double quote string given sample                        |
         | double quote string when sample                         |
         | double quote string then sample                         |
         | double quote string given sample with 'single quotes'   |
         | double quote string when sample with 'single quotes'    |
         | double quote string then sample with 'single quotes'    |
         | double quote string given sample with \"double quotes\" |
         | double quote string when sample with \"double quotes\"  |
         | double quote string then sample with \"double quotes\"  |

   Scenario: Simple RegEx sentences
      When requiring the cucumber sentences contained in the file "../../test-data/regex-cucumber-sentences"
      Then the returned cucumber sentences should be:
         | regex given sample                      |
         | regex when sample                       |
         | regex then sample                       |
         | regex given sample with 'single quotes' |
         | regex when sample with 'single quotes'  |
         | regex then sample with 'single quotes'  |
         | regex given sample with "double quotes" |
         | regex when sample with "double quotes"  |
         | regex then sample with "double quotes"  |
         | regex given sample with \/slashes\/     |
         | regex when sample with \/slashes\/      |
         | regex then sample with \/slashes\/      |