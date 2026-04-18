export default class BasePage {
  async open(path = "/"): Promise<void> {
    await browser.url(path);
  }

  async click(element: any): Promise<void> {
    await element.waitForClickable({ timeout: 10000 });
    await element.click();
  }

  async type(element: any, value: string): Promise<void> {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.setValue(value);
  }

  async textOf(element: any): Promise<string> {
    await element.waitForDisplayed({ timeout: 10000 });
    return element.getText();
  }

  async selectByVisibleText(element: any, text: string): Promise<void> {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.selectByVisibleText(text);
  }
}
