Feature: User Registration


  Scenario: User registers a new account successfully
    Given the user is on the home page
    When the user clicks the login link
    And the user completes registration with valid details
    Then the user should see account created confirmation
    When the user continues from account created
    Then the user should be logged in successfully