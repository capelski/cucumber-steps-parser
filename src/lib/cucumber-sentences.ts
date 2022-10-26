import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';

const getTagsFromStatement = (statement: ts.Statement, sourceFile: ts.SourceFile): string[] => {
    const tags: string[] = [];
    const jsDocArray = (statement as any).jsDoc;
    if (jsDocArray && Array.isArray(jsDocArray)) {
        jsDocArray.filter(jsDoc => ts.isJSDoc(jsDoc) && jsDoc.tags).forEach((jsDoc: ts.JSDoc) => {
            jsDoc.tags.forEach(t => {
                tags.push(t.tagName.getText(sourceFile));
            });
        });
    }

    return tags;
}

const getStepDefinitionText = (callExpression: ts.CallExpression, sourceFile: ts.SourceFile): { raw: string, formatted: string } => {
    const argument = callExpression.arguments[0];
    const stepDefinitionText = argument.getText(sourceFile);
    const raw = stepDefinitionText;
    if (ts.isRegularExpressionLiteral(argument)) {
        return {
            formatted: stepDefinitionText.replace(/^\/\^?/, '')
                .replace(/\$?\/$/, '')
                .replace(/\\"/g, '"')
                .replace(/\\'/g, "'"),
            raw,
        };
    }

    if (ts.isStringLiteral(argument) || ts.isNoSubstitutionTemplateLiteral(argument)) {
        return { formatted: argument.text, raw: argument.text, };
    }

    return { formatted: raw, raw };
}

const getArguments = (callExpression: ts.CallExpression, sourceFile: ts.SourceFile): string[] => {
    const functionDeclaration = callExpression.arguments[1];

    if (!functionDeclaration || !ts.isFunctionLike(functionDeclaration)) {
        return [];
    }
    return functionDeclaration.parameters.map(p => p.name.getText(sourceFile));
}

export interface ICucumberStepDetails {
    text: string;
    rawText: string;
    tags: string[];
    args: string[];
}

export const getFileCucumberSentences = (filePath: string) => {
    const sourceFile = ts.createSourceFile(
        'N/A',
        readFileSync(filePath).toString(),
        ts.ScriptTarget.ESNext,
        false
    );

    const cucumberStatements: ICucumberStepDetails[] = []
    sourceFile.statements.forEach(statement => {
        if (
            !ts.isExpressionStatement(statement) ||
            !ts.isCallExpression(statement.expression) ||
            statement.expression.arguments.length === 0 ||
            !statement.expression.expression.getText(sourceFile).match(/^(Given|When|Then)$/)
        ) {
            return;
        }

        const tags = getTagsFromStatement(statement, sourceFile);

        const text = getStepDefinitionText(statement.expression, sourceFile);

        const args = getArguments(statement.expression, sourceFile);

        cucumberStatements.push({ tags, args, rawText: text.raw, text: text.formatted });

    });

    return cucumberStatements;
};

export interface ICrawlingOptions {
    /**
     * Whether the folders found in the given path are recursively crawled. Defaults to true
     */
    recursive?: boolean;
    /**
     * Only the filenames matching this regular expression will be parsed. Defaults to typescript files only (`/^.*\.ts$/`)
     */
    filenameRegExp?: RegExp | string;
}

export const getFolderCucumberSentences = (
    folderPath: string,
    options: ICrawlingOptions = {}
): ICucumberStepDetails[] => {
    if (!existsSync(folderPath) || !lstatSync(folderPath).isDirectory()) {
        console.log(`No directory was found at ${folderPath}`);
        return [];
    }

    const recursiveCrawling = options.recursive === undefined || options.recursive;
    const filenameRegExp = new RegExp(options.filenameRegExp || '^.*\\.ts$');

    return readdirSync(folderPath).reduce<ICucumberStepDetails[]>((all, nextItem) => {
        const itemPath = join(folderPath, nextItem);
        const isDirectoryItem = lstatSync(itemPath).isDirectory();

        const sentences =
            isDirectoryItem && recursiveCrawling
                ? getFolderCucumberSentences(itemPath, options)
                : !isDirectoryItem && nextItem.match(filenameRegExp)
                    ? getFileCucumberSentences(itemPath)
                    : [];
        return all.concat(sentences);
    }, []);
};
