import {
  SEARCH_TERM_WITH_MULTIPLE_RESULT,
  SEARCH_TERM_WITH_SINGLE_RESULT,
} from "../variables";
import { delay } from "../utils";
import LaunchesPage from "../pages/LaunchesPage";
import HomePage from "../pages/HomePage";
import allureReporter from "@wdio/allure-reporter";
import HighChart from "../components/HighChart";

describe("Action", () => {
  describe("Home Page", () => {
    allureReporter.addDescription(
      "Action",
      "We Testing here the behaviors and actions "
    );
    describe("HighChart", () => {
      beforeEach(async () => {
        await HomePage.open();
        await delay(2000);
      });
      it("contains the right amount of points / dots", async () => {
        allureReporter.addSeverity("High");
        const points = await HighChart.points;
        expect(points.length).toBe(6);
      });
    });
  });
  describe("Past Launches Page", () => {
    before(async () => {
      await HomePage.open();
      await HomePage.goPastLaunchesPage;
      await delay(1000);
    });

    // Focus on the toggle button / sorting the cards
    describe("Clicking on the toggle button", () => {
      it("changes the text(Oldest <-> Newest) ", async () => {
        const paragraph = await LaunchesPage.paragraph;
        expect(paragraph).toHaveTextContaining("Oldest to Newest");
        const toggleButton = await LaunchesPage.toggleButton;
        await toggleButton.click();
        await delay(10000);
        expect(paragraph).toHaveTextContaining("Newest to Oldest");
      });
      it("sort the cards correctly", async () => {
        const firstCard = await LaunchesPage.firstCard;
        const toggleButton = await LaunchesPage.toggleButton;
        await toggleButton.click();
        const newFirstCard = await LaunchesPage.firstCard;
        await expect(firstCard.isEqual(newFirstCard)).not.toBe(true);
        // expect(await firstLastCard.isEqual(newFirstCard)).toBe(true);

        // expect(firstCard.elementId === newFirstCard.elementId).toBe(true);
      });
    });

    // Focus on the search input and the results
    describe("Using the search input", () => {
      describe(`with ${SEARCH_TERM_WITH_MULTIPLE_RESULT}`, () => {
        it(`display at least 3 cards`, async () => {
          await LaunchesPage.search(SEARCH_TERM_WITH_MULTIPLE_RESULT);
          expect(await LaunchesPage.cards.length).toBeGreaterThanOrEqual(3);
        });
        it(`display “Displaying 3 launches” as text above`, async () => {
          await LaunchesPage.search(SEARCH_TERM_WITH_MULTIPLE_RESULT);
          expect(await LaunchesPage.paragraph).toHaveTextContaining(
            "Displaying 3 launches"
          );
        });
      });
      describe(`with ${SEARCH_TERM_WITH_SINGLE_RESULT}`, () => {
        after(async () => {
          await LaunchesPage.search("");
        });
        it(`display at least 1 card`, async () => {
          await LaunchesPage.search(SEARCH_TERM_WITH_SINGLE_RESULT);

          expect(await LaunchesPage.cards.length).toBeGreaterThanOrEqual(1);
        });
        it(`display “Displaying 1 launches” as text above`, async () => {
          await LaunchesPage.search(SEARCH_TERM_WITH_SINGLE_RESULT);

          expect(await LaunchesPage.paragraph).toHaveTextContaining(
            "Displaying 1 launches"
          );
        });
      });
    });
  });
});
