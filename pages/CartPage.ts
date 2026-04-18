import BasePage from "./BasePage";

class CartPage extends BasePage {
  get cartHeader() {
    return $("li.active");
  }

  cartProductByName(productName: string) {
    return $(`//td[@class='cart_description']//a[normalize-space()='${productName}']`);
  }

  get proceedToCheckoutButton() {
    return $("a.check_out");
  }

  get placeOrderButton() {
    return $('a[href="/payment"]');
  }

  get commentTextarea() {
    return $("textarea.form-control");
  }

  async proceedToCheckout(comment: string): Promise<void> {
    await this.click(this.proceedToCheckoutButton);
    await this.type(this.commentTextarea, comment);
    await this.click(this.placeOrderButton);
  }
}

export default new CartPage();
