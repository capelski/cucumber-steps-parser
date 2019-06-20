Feature: Cucumber sentences parsing

   The parser should correctly retrieve the cucumber sentences defined
   inside Given, When or Then calls for a given file

   Scenario: Single quote cucumber sentences
      Given the file "single-quote-cucumber-sentences.ts" (inside the sentences-files folder)
      When the cucumber sentences defined in the file are required
      Then the following cucumber sentences are returned
         | Given single quote string                                       |
         | When single quote string                                        |
         | Then single quote string                                        |
         | Given single quote string with 'single quotes'                  |
         | When single quote string with 'single quotes'                   |
         | Then single quote string with 'single quotes'                   |
         | Given single quote string with single quotes after the sentence |
         | When single quote string with single quotes after the sentence  |
         | Then single quote string with single quotes after the sentence  |

   Scenario: Double quote cucumber sentences
      Given the file "double-quote-cucumber-sentences.ts" (inside the sentences-files folder)
      When the cucumber sentences defined in the file are required
      Then the following cucumber sentences are returned
         | Given double quote string                                       |
         | When double quote string                                        |
         | Then double quote string                                        |
         | Given double quote string with "double quotes"                  |
         | When double quote string with "double quotes"                   |
         | Then double quote string with "double quotes"                   |
         | Given double quote string with double quotes after the sentence |
         | When double quote string with double quotes after the sentence  |
         | Then double quote string with double quotes after the sentence  |

   Scenario: Template literal cucumber sentences
      Given the file "template-literal-cucumber-sentences.ts" (inside the sentences-files folder)
      When the cucumber sentences defined in the file are required
      Then the following cucumber sentences are returned
         | Given template literal string                                     |
         | When template literal string                                      |
         | Then template literal string                                      |
         | Multiline\nGiven template literal string                          |
         | Multiline\nWhen template literal string                           |
         | Multiline\nThen template literal string                           |
         | Given template literal string with `back sticks`                  |
         | When template literal string with `back sticks`                   |
         | Then template literal string with `back sticks`                   |
         | Given template literal string with back sticks after the sentence |
         | When template literal string with back sticks after the sentence  |
         | Then template literal string with back sticks after the sentence  |

   Scenario: RegEx cucumber sentences
      Given the file "regex-cucumber-sentences.ts" (inside the sentences-files folder)
      When the cucumber sentences defined in the file are required
      Then the following cucumber sentences are returned
         | Given regex                                 |
         | When regex                                  |
         | Then regex                                  |
         | Given regex with \/slashes\/                |
         | When regex with \/slashes\/                 |
         | Then regex with \/slashes\/                 |
         | Given regex with slashes after the sentence |
         | When regex with slashes after the sentence  |
         | Then regex with slashes after the sentence  |

   Scenario: Separate line cucumber sentences
      Given the file "separate-line-cucumber-sentences.ts" (inside the sentences-files folder)
      When the cucumber sentences defined in the file are required
      Then the following cucumber sentences are returned
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

   Scenario: Commented cucumber sentences
      Given the file "commented-cucumber-sentences.ts" (inside the sentences-files folder)
      When the cucumber sentences defined in the file are required
      Then no cucumber sentences are returned