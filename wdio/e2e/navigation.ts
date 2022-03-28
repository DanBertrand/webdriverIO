import LaunchesPage from "../pages/LaunchesPage";
import HomePage from "../pages/HomePage";
import { delay } from "../utils";
import { BASE_URL } from "../variables";
const allureReporter = require("@wdio/allure-reporter").default;
describe("Navigation", () => {
  allureReporter.addDescription(
    "Navigation",
    "We Testing here the navigation on link, either internal or external"
  );

  describe("Hompage", () => {
    beforeEach(async () => {
      await HomePage.open();
      await delay(2000);
    });
    it(`Clicking on “see all past launches” link redirect to “${BASE_URL}/past-launches”`, async () => {
      allureReporter.addLabel("Link");
      const link = await HomePage.link("/past-launches");
      await link.click();
      expect(await browser.getUrl()).toBe(`${BASE_URL}/past-launches`);
    });
    it("Clicking on “Go to spacex website” link redirect to “https://www.spacex.com/”", async () => {
      await HomePage.link("https://spacex.com").click();
      expect(await browser.getUrl()).toBe("https://www.spacex.com/");
    });
  });
  describe("Past Launches Page", () => {
    before(async () => {
      await HomePage.open();
      await HomePage.goPastLaunchesPage;
    });
    // Test that the link go back home bring you home
    describe("Clicking on the link “< Go back home”", async () => {
      it("brings to home page", async () => {
        await LaunchesPage.link("/").click();
        expect([BASE_URL, `${BASE_URL}/`]).toContain(await browser.getUrl());
      });
    });
  });
});
