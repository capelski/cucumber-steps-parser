Feature: Is non empty string

   The empty strings and strings containing only spaces should be detected as empty strings

   Scenario Outline: Empty strings detection
      When filtering the <input> string
      Then the returned result should be "<output>"
   
   Examples:
      | input | output |
      | "" | false |
      | "     " | false |
      | "     test" | true |
      | "test" | true |