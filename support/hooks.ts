import { AfterStep, Before } from "@wdio/cucumber-framework";

Before(async () => {
  await browser.setWindowSize(1920, 1080);
});

AfterStep(async function ({ result }) {
  if (result?.status !== "PASSED") {
    await browser.takeScreenshot();
  }
});
