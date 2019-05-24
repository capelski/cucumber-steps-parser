Feature: Cucumber sentences parsing

   The parser should correctly retrieve the cucumber sentences defined inside Given, When or Then calls

   Scenario: Single quote cucumber sentences
      When requiring the cucumber sentences contained in the file "../../test-data/single-quote-cucumber-sentences"
      Then the returned cucumber sentences should be:
         | Given single quote string                                       |
         | When single quote string                                        |
         | Then single quote string                                        |
         | Given single quote string with \'single quotes\'                |
         | When single quote string with \'single quotes\'                 |
         | Then single quote string with \'single quotes\'                 |
         | Given single quote string with single quotes after the sentence |
         | When single quote string with single quotes after the sentence  |
         | Then single quote string with single quotes after the sentence  |

   Scenario: Double quote cucumber sentences
      When requiring the cucumber sentences contained in the file "../../test-data/double-quote-cucumber-sentences"
      Then the returned cucumber sentences should be:
         | Given double quote string                                       |
         | When double quote string                                        |
         | Then double quote string                                        |
         | Given double quote string with \"double quotes\"                |
         | When double quote string with \"double quotes\"                 |
         | Then double quote string with \"double quotes\"                 |
         | Given double quote string with double quotes after the sentence |
         | When double quote string with double quotes after the sentence  |
         | Then double quote string with double quotes after the sentence  |

   Scenario: Template literal cucumber sentences
      When requiring the cucumber sentences contained in the file "../../test-data/template-literal-cucumber-sentences"
      Then the returned cucumber sentences should be:
         | Given template literal string                                     |
         | When template literal string                                      |
         | Then template literal string                                      |
         | Given template literal string with \`back sticks\`                |
         | When template literal string with \`back sticks\`                 |
         | Then template literal string with \`back sticks\`                 |
         | Given template literal string with back sticks after the sentence |
         | When template literal string with back sticks after the sentence  |
         | Then template literal string with back sticks after the sentence  |

   Scenario: Simple RegEx sentences
      When requiring the cucumber sentences contained in the file "../../test-data/regex-cucumber-sentences"
      Then the returned cucumber sentences should be:
         | Given regex                                 |
         | When regex                                  |
         | Then regex                                  |
         | Given regex with \/slashes\/                |
         | When regex with \/slashes\/                 |
         | Then regex with \/slashes\/                 |
         | Given regex with slashes after the sentence |
         | When regex with slashes after the sentence  |
         | Then regex with slashes after the sentence  |