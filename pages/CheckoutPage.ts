import BasePage from "./BasePage";

export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

class CheckoutPage extends BasePage {
  get nameOnCardInput() {
    return $('input[data-qa="name-on-card"]');
  }

  get cardNumberInput() {
    return $('input[data-qa="card-number"]');
  }

  get cvcInput() {
    return $('input[data-qa="cvc"]');
  }

  get expiryMonthInput() {
    return $('input[data-qa="expiry-month"]');
  }

  get expiryYearInput() {
    return $('input[data-qa="expiry-year"]');
  }

  get payAndConfirmButton() {
    return $('button[data-qa="pay-button"]');
  }

  get orderSuccessMessage() {
    return $('h2[data-qa="order-placed"]');
  }

  async completePayment(payment: PaymentDetails): Promise<void> {
    await this.type(this.nameOnCardInput, payment.nameOnCard);
    await this.type(this.cardNumberInput, payment.cardNumber);
    await this.type(this.cvcInput, payment.cvc);
    await this.type(this.expiryMonthInput, payment.expiryMonth);
    await this.type(this.expiryYearInput, payment.expiryYear);
    await this.click(this.payAndConfirmButton);
  }
}

export default new CheckoutPage();
