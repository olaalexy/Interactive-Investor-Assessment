import BasePage from "./BasePage";

class LoginPage extends BasePage {
  get loginHeader() {
    return $("div.login-form h2");
  }

  get emailInput() {
    return $('input[data-qa="login-email"]');
  }

  get passwordInput() {
    return $('input[data-qa="login-password"]');
  }

  get loginButton() {
    return $('button[data-qa="login-button"]');
  }

  get loggedInUserLabel() {
    return $("[href='/logout']");
  }

  async login(email: string, password: string): Promise<void> {
    await this.type(this.emailInput, email);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async isLoginPageVisible(): Promise<boolean> {
    return this.loginHeader.isDisplayed();
  }
}

export default new LoginPage();
