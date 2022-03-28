import { BASE_URL } from "../variables";
/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

export default class Page {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(path: string = "") {
    return browser.url(`${BASE_URL}${path}`);
  }
  public get h1() {
    return $("h1");
  }
  public get h2() {
    return $("h2");
  }
  public get links() {
    return $$(`a`);
  }

  public link(href: string) {
    return $(`a[href='${href}']`);
  }
}
