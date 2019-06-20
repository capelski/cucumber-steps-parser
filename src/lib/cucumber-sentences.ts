import * as fs from 'fs';
import typescript from 'typescript';

export const getCucumberSentences = (filePath: string) => {
    const sourceFile = typescript.createSourceFile(
        'N/A',
        fs.readFileSync(filePath).toString(),
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
                            argument.text.replace(/^\//, '').replace(/\/$/, '')
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
