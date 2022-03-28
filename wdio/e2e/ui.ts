import {
  BORDER_COLOR_BASE,
  FAILED_LAUNCH_COLOR,
  SUCCESSFUL_LAUNCH_COLOR,
  TEXT_COLOR,
} from "../variables";
import LaunchesPage from "../pages/LaunchesPage";
import HomePage from "../pages/HomePage";
import { delay } from "../utils";
import HighChart from "../components/HighChart";
import allureReporter from "@wdio/allure-reporter";

describe("UI", () => {
  describe("Home Page", () => {
    beforeEach(async () => {
      await HomePage.open();
      await delay(2000);
    });
    it("contain h1 with the text “SpaceX Launches”", async () => {
      allureReporter.addDescription(
        "UI",
        "We Testing here that the UI is display on screen correctly. Color, size ..."
      );
      await browser.takeElementScreenshot(await HomePage.h1.elementId);
      expect(await HomePage.h1.getText()).toBe("SpaceX Launches");
    });
    it("contain h2  with the text “Upcoming Launches”", async () => {
      expect(await HomePage.h2.getText()).toBe("Upcoming Launches");
      await browser.takeElementScreenshot(await HomePage.h2.elementId);
    });
    it("Display the highCHart component", async () => {
      const highChart = await HighChart.component;
      expect(await highChart.isDisplayed()).toBe(true);
    });
  });
  describe("Past Launches Page", () => {
    before(async () => {
      await HomePage.open();
      await HomePage.goPastLaunchesPage;
    });
    // Check if the main elements are correctly displayed
    describe("Contains", () => {
      it("h2 with the text “Past Launches”", async () => {
        expect(await LaunchesPage.h2.getText()).toBe("Past Launches");
      });
      it("input label: “Search by Flight Number or Name”", async () => {
        const label = await LaunchesPage.labelFor("searchBox");
        expect(await label.getText()).toBe("Search by Flight Number or Name");
        expect(label).toBeDisplayed();
      });
    });
    // Focus on the cards: backgroundColor / textColor / textValue
    describe(`Cards`, () => {
      it(`has flight name displayed properly`, async () => {
        expect(await LaunchesPage.firstFlightTitle).toBeDisplayed();
      });
      it(`has flight number displayed properly`, async () => {
        expect(await LaunchesPage.firstFlightNum).toBeDisplayed();
      });
      it(`has flight date displayed properly`, async () => {
        expect(await LaunchesPage.firstFlightDate).toBeDisplayed();
      });
      it(`has grey border color`, async () => {
        expect(BORDER_COLOR_BASE).toContain(
          (await LaunchesPage.firstCard.getCSSProperty("border-color")).parsed
            .rgb
        );
      });
      describe(`with status “FAILED”`, () => {
        it(`has red background colour`, async () => {
          const failedCard = await LaunchesPage.failedCard;
          const backgroundColor = await failedCard.getCSSProperty(
            "background-color"
          );
          expect(FAILED_LAUNCH_COLOR).toContain(backgroundColor.value);
        });
        it(`contains white text “FAILED”`, async () => {
          const failedCard = await LaunchesPage.failedCard;
          const color = await failedCard.getCSSProperty("color");
          expect(await failedCard.getText()).toBe("FAILED");
          expect(TEXT_COLOR).toContain(color.value);
        });
      });
      describe(`with status “SUCCESS”`, () => {
        it(`has green background colour`, async () => {
          const backgroundColor = await LaunchesPage.successCard.getCSSProperty(
            "background-color"
          );
          expect(SUCCESSFUL_LAUNCH_COLOR).toContain(backgroundColor.value);
        });
        it(`contains white text “SUCCESS”`, async () => {
          const card = LaunchesPage.successCard;
          const color = await card.getCSSProperty("color");
          expect(await card.getText()).toBe("SUCCESSFUL");
          expect(TEXT_COLOR).toContain(color.value);
        });
      });
    });
  });
});
