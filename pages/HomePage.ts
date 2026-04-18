import BasePage from "./BasePage";

class HomePage extends BasePage {
  get signupLoginLink() {
    return $('a[href="/login"]');
  }

  get productsLink() {
    return $('a[href="/products"]');
  }

  get cartLink() {
    return $('a[href="/view_cart"]');
  }

  async openHome(): Promise<void> {
    await this.open("/");
  }

  async goToLogin(): Promise<void> {
    await this.open("/login");
  }

  async goToProducts(): Promise<void> {
    await this.click(this.productsLink);
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartLink);
  }
}

export default new HomePage();
