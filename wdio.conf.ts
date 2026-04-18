import { HTMLReportGenerator, JSONReporter } from "wdio-json-html-reporter";

const parseBoolean = (value?: string): boolean | undefined => {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "y"].includes(normalized)) return true;
  if (["false", "0", "no", "n"].includes(normalized)) return false;
  return undefined;
};

const cliHeadless = process.argv
  .find((arg) => arg.startsWith("--headless="))
  ?.split("=")[1];

const envHeadless = parseBoolean(process.env.HEADLESS);
const isHeadless = parseBoolean(cliHeadless) ?? envHeadless ?? true;

export const config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",
  specs: ["./features/**/*.feature"],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: isHeadless ? ["--headless=new", "--disable-gpu", "--window-size=1920,1080"] : []
      }
    }
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "https://automationexercise.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: "cucumber",
//   reporters: [
//     "spec",
//     [
//       JSONReporter,
//       {
//         outputFile: "./reports/test-results.json",
//         screenshotOption: "OnFailure"
//       }
//     ]
//   ],
  cucumberOpts: {
    require: ["./features/step-definitions/**/*.ts", "./support/hooks.ts"],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: true,
    timeout: 60000,
    ignoreUndefinedDefinitions: false
  },
  onPrepare: () => {
    console.log("Starting WebdriverIO test run...");
    console.log(`Headless mode: ${isHeadless}`);
  },
  onComplete: async () => {
    const reportGenerator = new HTMLReportGenerator("./reports/automationexercise-report.html");
    await reportGenerator.convertJSONFolderToHTML("./reports");
    console.log("HTML report generated at ./reports/automationexercise-report.html");
  }
} as WebdriverIO.Config;

export default config;
