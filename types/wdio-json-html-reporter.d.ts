declare module "wdio-json-html-reporter" {
  export class JSONReporter {
    constructor(options?: Record<string, unknown>);
  }

  export class HTMLReportGenerator {
    constructor(outputFilePath: string, historyFilePath?: string);
    convertJSONFolderToHTML(inputFolder: string): Promise<void>;
  }
}
