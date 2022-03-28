import Page from "./Page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  public get goPastLaunchesPage() {
    return $("a[href='/past-launches']").click();
  }
  public get highChart() {
    return browser.react$("HighChart");
  }
}

export default new HomePage();
