Feature: User Searches Product


  Scenario: User searches and sees product in results
    Given the user is logged in
    When the user navigates to products page
    And the user searches for "Blue Top"
    Then search results should include "Blue Top"