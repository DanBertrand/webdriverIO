import Page from "./Page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LaunchesPage extends Page {
  public get toggleButton() {
    return $("div[class='App'] button");
  }
  public get paragraph() {
    return $("#num-of-launches-display-paragraph");
  }
  public get searchInput() {
    return $("#searchBox");
  }
  public get cards() {
    return $$("div[class='card']");
  }
  public labelFor(input: string) {
    return $(`label[for='${input}']`);
  }
  public get successCard() {
    return $("div.status.success");
  }
  public get failedCard() {
    return $("div.status.failed");
  }
  public get firstCard() {
    return $(".card:first-of-type");
  }
  public get lastCard() {
    return $(".card:first-of-type");
  }
  public get firstFlightDate() {
    return $("div[class='App'] div:nth-child(1) p:nth-child(3)");
  }
  public get firstFlightTitle() {
    return $("div[class='App'] div:nth-child(1) p:nth-child(1)");
  }
  public get firstFlightNum() {
    return $(
      "div[class='App'] div:nth-child(1) p:nth-child(2) kbd:nth-child(1)"
    );
  }
  public async search(value: string): Promise<void> {
    const input = await this.searchInput;
    input.setValue(value);
  }
}

export default new LaunchesPage();
