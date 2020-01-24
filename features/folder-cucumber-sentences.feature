Feature: Cucumber sentences folder parsing

   The parser should correctly retrieve the cucumber sentences defined
   inside Given, When or Then calls in any file of the given folder

   Scenario: Folder parsing with default options
      Given the folder "folder" (inside the sentences-files folder)
      When the cucumber sentences defined in the folder are required
      Then the following cucumber sentences are returned
         | Given sentence in file-1 |
         | When sentence in file-1  |
         | Then sentence in file-1  |
         | Given sentence in file-2 |
         | When sentence in file-2  |
         | Then sentence in file-2  |
         | Given sentence in file-3 |
         | When sentence in file-3  |
         | Then sentence in file-3  |
         | Given sentence in file-4 |
         | When sentence in file-4  |
         | Then sentence in file-4  |
         | Given sentence in file-5 |
         | When sentence in file-5  |
         | Then sentence in file-5  |
         | Given sentence in file-6 |
         | When sentence in file-6  |
         | Then sentence in file-6  |

   Scenario: Folder parsing without recursion
      Given the folder "folder" (inside the sentences-files folder)
      When the cucumber sentences defined in the folder are required without recursion
      Then the following cucumber sentences are returned
         | Given sentence in file-1 |
         | When sentence in file-1  |
         | Then sentence in file-1  |
         | Given sentence in file-2 |
         | When sentence in file-2  |
         | Then sentence in file-2  |
         | Given sentence in file-3 |
         | When sentence in file-3  |
         | Then sentence in file-3  |
         | Given sentence in file-4 |
         | When sentence in file-4  |
         | Then sentence in file-4  |

   Scenario: Folder parsing with filename RegExp
      Given the folder "folder" (inside the sentences-files folder)
      When the cucumber sentences defined in the folder are required with "^.*\\.step\\.ts$" filename RegExp
      Then the following cucumber sentences are returned
         | Given sentence in file-3 |
         | When sentence in file-3  |
         | Then sentence in file-3  |
         | Given sentence in file-4 |
         | When sentence in file-4  |
         | Then sentence in file-4  |
         | Given sentence in file-6 |
         | When sentence in file-6  |
         | Then sentence in file-6  |