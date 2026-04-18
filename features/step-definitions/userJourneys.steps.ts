import { Given, Then, When } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ProductsPage from "../../pages/ProductsPage";
import CartPage from "../../pages/CartPage";
import CheckoutPage from "../../pages/CheckoutPage";
import { testData } from "../../utils/testData";

const loginAsValidUser = async (): Promise<void> => {
  await HomePage.open("/login");
  await LoginPage.login(testData.login.email, testData.login.password);
};

Given("the user is on the home page", async () => {
  await HomePage.openHome();
});

When("the user navigates to the login page", async () => {
  await HomePage.goToLogin();
});

When("the user logs in with valid credentials", async () => {
  await loginAsValidUser();
});

Then("the user should be logged in successfully", async () => {
  await expect(LoginPage.loggedInUserLabel).toBeDisplayed();
});

When("the user completes registration with valid details", async () => {
  const email = RegisterPage.generateUniqueEmail();
  await RegisterPage.registerNewUser(
    testData.registration.displayName,
    email,
    testData.registration.account
  );
});

Then("the user should see account created confirmation", async () => {
  await expect(RegisterPage.accountCreatedHeading).toBeDisplayed();
});

When("the user continues from account created", async () => {
  await RegisterPage.continueFromAccountCreated();
});

Given("the user is logged in", async () => {
  await loginAsValidUser();
  await expect(LoginPage.loggedInUserLabel).toBeDisplayed();
});

When("the user navigates to products page", async () => {
  await HomePage.goToProducts();
});

When("the user searches for {string}", async (keyword: string) => {
  await ProductsPage.searchProduct(keyword);
});

Then("search results should include {string}", async (productName: string) => {
  const productCard = await ProductsPage.productCardByName(productName);
  await expect(productCard).toBeDisplayed();
});

When("the user adds {string} to the cart", async (productName: string) => {
  await ProductsPage.addProductToCart(productName);
  await ProductsPage.click(ProductsPage.viewCartLinkInModal);
});

Then("the cart should contain {string}", async (productName: string) => {
  await expect(CartPage.cartProductByName(productName)).toBeDisplayed();
});

When("the user proceeds to checkout", async () => {
  await CartPage.proceedToCheckout(testData.checkout.comment);
});

When("the user completes payment details", async () => {
  await CheckoutPage.completePayment(testData.payment);
});

Then("the order should be placed successfully", async () => {
  const message = await CheckoutPage.orderSuccessMessage.getText();
  expect(message).toContain("ORDER PLACED!");
});
