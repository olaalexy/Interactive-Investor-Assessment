Feature: User Adds Product To Cart


  Scenario: User adds a product to cart successfully
    Given the user is logged in
    When the user navigates to products page
    And the user adds "Blue Top" to the cart
    Then the cart should contain "Blue Top"

