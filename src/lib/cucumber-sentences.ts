import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import typescript from 'typescript';

export const getFileCucumberSentences = (filePath: string) => {
    const sourceFile = typescript.createSourceFile(
        'N/A',
        readFileSync(filePath).toString(),
        typescript.ScriptTarget.ESNext,
        false
    );

    const cucumberStatements = sourceFile.statements.filter(statement => {
        const expression = (statement as any).expression;
        return (
            expression &&
            expression.expression &&
            expression.expression.escapedText &&
            expression.expression.escapedText.match(/^(Given|When|Then)$/)
        );
    });

    const cucumberSentences = cucumberStatements.reduce(
        (reduced, statement) => {
            const sentences: string[] = [];
            statement.forEachChild(child => {
                if (child.kind === typescript.SyntaxKind.CallExpression) {
                    const _arguments = (child as any).arguments;

                    const stringArguments = _arguments
                        .filter(
                            (argument: any) =>
                                argument.kind === typescript.SyntaxKind.StringLiteral ||
                                argument.kind === typescript.SyntaxKind.FirstTemplateToken
                        )
                        .map((argument: any) => argument.text);
                    sentences.push(...stringArguments);

                    const regexArguments = _arguments
                        .filter(
                            (argument: any) =>
                                argument.kind === typescript.SyntaxKind.RegularExpressionLiteral
                        )
                        .map((argument: any) =>
                            argument.text
                                .replace(/^\/\^?/, '')
                                .replace(/\$?\/$/, '')
                                .replace(/\\"/g, '"')
                                .replace(/\\'/g, "'")
                        );
                    sentences.push(...regexArguments);
                }
            });
            return reduced.concat(sentences);
        },
        [] as string[]
    );

    return cucumberSentences;
};

export interface ICrawlingOptions {
    recursive?: boolean;
    filenameRegExp?: RegExp | string;
}

export const getFolderCucumberSentences = (
    folderPath: string,
    options: ICrawlingOptions = {}
): string[] => {
    if (!existsSync(folderPath) || !lstatSync(folderPath).isDirectory()) {
        console.log(`No directory was found at ${folderPath}`);
        return [];
    }

    const recursiveCrawling = options.recursive === undefined || options.recursive;
    const filenameRegExp = new RegExp(options.filenameRegExp || '^.*\\.ts$');

    return readdirSync(folderPath).reduce<string[]>((all, nextItem) => {
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
