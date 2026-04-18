Feature: User Checks Out Successfully


  Scenario: Logged in user places order successfully
    Given the user is logged in
    When the user navigates to products page
    And the user adds "Blue Top" to the cart
    And the user proceeds to checkout
    And the user completes payment details
    Then the order should be placed successfully