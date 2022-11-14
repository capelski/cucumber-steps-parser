import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';
import { ICucumberStep, ICucumberStepBase, IParsingOptions } from '../types';

const getStatementJsDocTags = (statement: ts.Statement, sourceFile: ts.SourceFile): string[] => {
    const jsDoc: ts.JSDoc[] | undefined = (statement as any).jsDoc;
    const tags: string[] =
        jsDoc && Array.isArray(jsDoc)
            ? jsDoc
                  .filter((jsDoc) => ts.isJSDoc(jsDoc) && jsDoc.tags)
                  .reduce<string[]>((jsDocsReduced, jsDoc) => {
                      const tags = jsDoc.tags.map((tag) => {
                          return tag.tagName.getText(sourceFile);
                      }, []);
                      return jsDocsReduced.concat(tags);
                  }, [])
            : [];

    return tags;
};

const getStepDefinitionText = (
    callExpression: ts.CallExpression,
    sourceFile: ts.SourceFile
): ICucumberStepBase => {
    const argument = callExpression.arguments[0];
    const rawText = argument.getText(sourceFile);

    if (ts.isRegularExpressionLiteral(argument)) {
        return {
            rawText,
            text: rawText
                .replace(/^\/\^?/, '')
                .replace(/\$?\/$/, '')
                .replace(/\\"/g, '"')
                .replace(/\\'/g, "'")
        };
    }

    if (ts.isStringLiteral(argument) || ts.isNoSubstitutionTemplateLiteral(argument)) {
        return { rawText: argument.text, text: argument.text };
    }

    return { rawText, text: rawText };
};

const getArguments = (callExpression: ts.CallExpression, sourceFile: ts.SourceFile): string[] => {
    const functionDeclaration = callExpression.arguments[1];

    if (!functionDeclaration || !ts.isFunctionLike(functionDeclaration)) {
        return [];
    }
    return functionDeclaration.parameters.map((p) => p.name.getText(sourceFile));
};

export const getFileCucumberSteps = (filePath: string) => {
    if (!existsSync(filePath) || !lstatSync(filePath).isFile()) {
        console.log(`No file was found at ${filePath}`);
        return [];
    }

    const sourceFile = ts.createSourceFile(
        'N/A',
        readFileSync(filePath).toString(),
        ts.ScriptTarget.ESNext,
        false
    );

    const cucumberSteps = sourceFile.statements.reduce<ICucumberStep[]>((reduced, statement) => {
        if (
            !ts.isExpressionStatement(statement) ||
            !ts.isCallExpression(statement.expression) ||
            statement.expression.arguments.length === 0 ||
            !statement.expression.expression.getText(sourceFile) ||
            !statement.expression.expression.getText(sourceFile).match(/^(Given|When|Then)$/)
        ) {
            return reduced;
        }

        const args = getArguments(statement.expression, sourceFile);
        const jsDocTags = getStatementJsDocTags(statement, sourceFile);
        const text = getStepDefinitionText(statement.expression, sourceFile);

        const cucumberStep: ICucumberStep = {
            arguments: args,
            jsDocTags,
            ...text
        };

        return reduced.concat([cucumberStep]);
    }, []);

    return cucumberSteps;
};

export const getFolderCucumberSteps = (
    folderPath: string,
    options: IParsingOptions = {}
): ICucumberStep[] => {
    if (!existsSync(folderPath) || !lstatSync(folderPath).isDirectory()) {
        console.log(`No directory was found at ${folderPath}`);
        return [];
    }

    const recursiveParsing = options.recursive === undefined || options.recursive;
    const filenameRegExp = new RegExp(options.filenameRegExp || '^.*\\.ts$');

    return readdirSync(folderPath).reduce<ICucumberStep[]>((reduced, item) => {
        const itemPath = join(folderPath, item);
        const isDirectoryItem = lstatSync(itemPath).isDirectory();

        const cucumberSteps =
            isDirectoryItem && recursiveParsing
                ? getFolderCucumberSteps(itemPath, options)
                : !isDirectoryItem && item.match(filenameRegExp)
                ? getFileCucumberSteps(itemPath)
                : [];
        return reduced.concat(cucumberSteps);
    }, []);
};
