import BasePage from "./BasePage";

class ProductsPage extends BasePage {
  get productsHeader() {
    return $("div.features_items > h2");
  }

  get searchInput() {
    return $("#search_product");
  }

  get searchButton() {
    return $("#submit_search");
  }

  get searchedProductsHeader() {
    return $("div.features_items > h2");
  }

  async productTileByName(productName: string): Promise<any> {
    const tiles = await $$("div.single-products");
    for (const tile of tiles) {
      const name = (await tile.$(".productinfo p").getText()).trim();
      if (name.toLowerCase() === productName.trim().toLowerCase()) {
        return tile;
      }
    }
    throw new Error(`Product tile not found for: ${productName}`);
  }

  async productCardByName(productName: string): Promise<any> {
    const tile = await this.productTileByName(productName);
    return tile.$(".productinfo.text-center");
  }

  async addToCartButtonByProduct(productName: string): Promise<any> {
    const tile = await this.productTileByName(productName);
    return tile.$(".product-overlay a.add-to-cart");
  }

  get continueShoppingButton() {
    return $("button.btn-success.close-modal");
  }

  get viewCartLinkInModal() {
    return $('p.text-center a[href="/view_cart"]');
  }

  async searchProduct(keyword: string): Promise<void> {
    await this.type(this.searchInput, keyword);
    await this.click(this.searchButton);
  }

  async addProductToCart(productName: string): Promise<void> {
    const productTile = await this.productTileByName(productName);
    await productTile.scrollIntoView();
    await productTile.moveTo();
    const addButton = await this.addToCartButtonByProduct(productName);
    try {
      await this.click(addButton);
    } catch {
      // Fallback for occasional overlay timing/interception issues.
      await browser.execute((el) => (el as HTMLElement).click(), addButton);
    }
    await this.viewCartLinkInModal.waitForDisplayed({ timeout: 10000 });
  }
}

export default new ProductsPage();
