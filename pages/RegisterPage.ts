import BasePage from "./BasePage";
import { fakerEN_GB as faker } from "@faker-js/faker";

export interface RegistrationAccountDetails {
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

class RegisterPage extends BasePage {
  get signupSectionHeader() {
    return $(".signup-form h2");
  }

  get accountInformationHeading() {
    return $("h2.title.text-center");
  }

  get nameInput() {
    return $('input[data-qa="signup-name"]');
  }

  get emailInput() {
    return $('input[data-qa="signup-email"]');
  }

  get signupButton() {
    return $('button[data-qa="signup-button"]');
  }

  get titleMrRadio() {
    return $("#id_gender1");
  }

  get passwordInput() {
    return $('input[data-qa="password"]');
  }

  get birthdaySelect() {
    return $("#days");
  }

  get birthMonthSelect() {
    return $("#months");
  }

  get birthYearSelect() {
    return $("#years");
  }

  get newsletterCheckbox() {
    return $("#newsletter");
  }

  get partnerOffersCheckbox() {
    return $("#optin");
  }

  get firstNameInput() {
    return $('input[data-qa="first_name"]');
  }

  get lastNameInput() {
    return $('input[data-qa="last_name"]');
  }

  get companyInput() {
    return $('input[data-qa="company"]');
  }

  get addressInput() {
    return $('input[data-qa="address"]');
  }

  get address2Input() {
    return $('input[data-qa="address2"]');
  }

  get countrySelect() {
    return $('select[data-qa="country"]');
  }

  get stateInput() {
    return $('input#state, input[name="state"]');
  }

  get cityInput() {
    return $('input[data-qa="city"]');
  }

  get zipcodeInput() {
    return $('input[data-qa="zipcode"]');
  }

  get mobileInput() {
    return $('input[data-qa="mobile_number"]');
  }

  get createAccountButton() {
    return $('button[data-qa="create-account"]');
  }

  get accountCreatedHeading() {
    return $('h2[data-qa="account-created"]');
  }

  get continueButton() {
    return $('a[data-qa="continue-button"]');
  }

  generateUniqueEmail(): string {
    return faker.internet.email({ provider: "yopmail.com" });
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.type(this.nameInput, name);
    await this.type(this.emailInput, email);
    await this.click(this.signupButton);
  }

  private async selectCountryAndNotify(details: RegistrationAccountDetails): Promise<void> {
    await this.selectByVisibleText(this.countrySelect, details.country);
  }

  private async fillState(details: RegistrationAccountDetails): Promise<void> {
    await this.type(this.stateInput, details.state);
  }

  async fillAccountInformation(details: RegistrationAccountDetails): Promise<void> {
    await this.click(this.titleMrRadio);
    await this.type(this.passwordInput, details.password);
    await this.selectByVisibleText(this.birthdaySelect, details.birthDay);
    await this.selectByVisibleText(this.birthMonthSelect, details.birthMonth);
    await this.selectByVisibleText(this.birthYearSelect, details.birthYear);
    await this.click(this.newsletterCheckbox);
    await this.click(this.partnerOffersCheckbox);
    await this.type(this.firstNameInput, details.firstName);
    await this.type(this.lastNameInput, details.lastName);
    await this.type(this.companyInput, details.company);
    await this.type(this.addressInput, details.address);
    await this.type(this.address2Input, details.address2);
    await this.selectCountryAndNotify(details);
    await this.fillState(details);
    await this.type(this.cityInput, details.city);
    await this.type(this.zipcodeInput, details.zipcode);
    await this.type(this.mobileInput, details.mobile);
    await this.click(this.createAccountButton);
  }

  async registerNewUser(
    displayName: string,
    email: string,
    account: RegistrationAccountDetails
  ): Promise<void> {
    await this.startSignup(displayName, email);
    await this.accountInformationHeading.waitForDisplayed({ timeout: 10000 });
    await this.fillAccountInformation(account);
  }

  async isSignupSectionVisible(): Promise<boolean> {
    return this.signupSectionHeader.isDisplayed();
  }

  async isAccountCreatedVisible(): Promise<boolean> {
    return this.accountCreatedHeading.isDisplayed();
  }

  async continueFromAccountCreated(): Promise<void> {
    await this.click(this.continueButton);
  }
}

export default new RegisterPage();
