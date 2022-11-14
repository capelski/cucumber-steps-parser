export interface ICucumberStepBase {
    rawText: string;
    text: string;
}

export interface ICucumberStep extends ICucumberStepBase {
    arguments: string[];
    jsDocTags: string[];
}
