import { invariant } from '@lesnoypudge/utils';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';



type ImportMatch = {
    match: string;
    path: string;
};

const invalidImports: ImportMatch[] = [];
const srcDir = path.resolve(process.cwd(), 'src');

const getFilesRecursively = (directory: string): string[] => {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    return entries.flatMap((entry) => {
        const fullPath = path.join(directory, entry.name);
        return entry.isDirectory() ? getFilesRecursively(fullPath) : fullPath;
    });
};

const isInvalidPath = (importPath: string): boolean => {
    // const regex = /^(?:src(?:\/.+)?|\.\.(?:\/.+)?|\.)$/;
    const regex = /^(\.{1,2}$|src(\/.*)?$|\.\.\/.*$)/;
    return regex.test(importPath);
};

const analyzeFile = (filePath: string) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (!trimmed.startsWith('import') && !trimmed.startsWith('export')) return;

            const importExportRegex = /(?:import|export)(?:.*?\sfrom)?\s+["'](.+?)["']/g;
            let match: RegExpExecArray | null;

            while ((match = importExportRegex.exec(trimmed)) !== null) {
                const importPath = match[1];
                invariant(importPath, 'Import path not found');

                if (isInvalidPath(importPath)) {
                    invalidImports.push({
                        match: importPath,
                        path: `${path.relative(srcDir, filePath)}:${index + 1}`,
                    });
                }
            }
        });
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error instanceof Error ? error.message : error);
    }
};

const printReport = (matches: ImportMatch[]) => {
    if (matches.length === 0) return;

    console.log('\u001B[36m%s\u001B[0m\n', 'Invalid import/exports found:');

    matches.forEach(({ match, path }, index) => {
        console.log(
            `\u001B[36m#${index + 1}\u001B[0m\n`
            + `\u001B[33m ${path}\u001B[0m\n`
            + `\u001B[31m   └─  ${match}\u001B[0m\n`,
        );
    });
};

const main = () => {
    const tsFiles = getFilesRecursively(srcDir)
        .filter((file) => ['.ts', '.tsx'].includes(path.extname(file)));

    tsFiles.forEach(analyzeFile);

    printReport(invalidImports);

    if (invalidImports.length > 0) return;

    console.log('\u001B[32m%s\u001B[0m', '✅ No invalid import/exports found!');
};

main();