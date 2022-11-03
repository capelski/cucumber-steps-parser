Feature: Cucumber steps folder parsing

   The parser should correctly retrieve the cucumber steps defined
   inside Given, When or Then calls in any file of the given folder

   Scenario: Folder parsing with default options
      Given the folder "folder" (inside the steps-files folder)
      When the cucumber steps defined in the folder are required
      Then the following cucumber steps are returned
         | Given step in file-1 |
         | When step in file-1  |
         | Then step in file-1  |
         | Given step in file-2 |
         | When step in file-2  |
         | Then step in file-2  |
         | Given step in file-3 |
         | When step in file-3  |
         | Then step in file-3  |
         | Given step in file-4 |
         | When step in file-4  |
         | Then step in file-4  |
         | Given step in file-5 |
         | When step in file-5  |
         | Then step in file-5  |
         | Given step in file-6 |
         | When step in file-6  |
         | Then step in file-6  |

   Scenario: Folder parsing without recursion
      Given the folder "folder" (inside the steps-files folder)
      When the cucumber steps defined in the folder are required without recursion
      Then the following cucumber steps are returned
         | Given step in file-1 |
         | When step in file-1  |
         | Then step in file-1  |
         | Given step in file-2 |
         | When step in file-2  |
         | Then step in file-2  |
         | Given step in file-3 |
         | When step in file-3  |
         | Then step in file-3  |
         | Given step in file-4 |
         | When step in file-4  |
         | Then step in file-4  |

   Scenario: Folder parsing with filename RegExp
      Given the folder "folder" (inside the steps-files folder)
      When the cucumber steps defined in the folder are required with "^.*\.step\.ts$" filename RegExp
      Then the following cucumber steps are returned
         | Given step in file-3 |
         | When step in file-3  |
         | Then step in file-3  |
         | Given step in file-4 |
         | When step in file-4  |
         | Then step in file-4  |
         | Given step in file-6 |
         | When step in file-6  |
         | Then step in file-6  |