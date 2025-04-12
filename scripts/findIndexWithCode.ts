/* eslint-disable import-x/no-extraneous-dependencies */
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import * as _ from '@babel/traverse';



const traverse = (_ as any).default.default as typeof _.default;

const findIndexFiles = async (...dirs: string[]) => {
    for (const dir of dirs) {
        const currentDir = path.resolve(process.cwd(), dir);
        const entries = await fs.promises.readdir(
            currentDir,
            { withFileTypes: true },
        );

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                await findIndexFiles(path.join(dir, entry.name));
            } else if (/^index\.(ts|tsx)$/.test(entry.name)) {
                const src = await fs.promises.readFile(fullPath, 'utf8');
                const ast = parse(src, {
                    sourceType: 'module',
                    plugins: ['typescript', 'jsx'],
                });

                let flagged = false;

                traverse(ast, {
                    enter: ({ node, parent }) => {
                        // only inspect top-level statements, and stop once flagged
                        if (flagged || parent.type !== 'Program') return;

                        const t = node.type;

                        if (
                            t !== 'ExportAllDeclaration'
                            && t !== 'ExportNamedDeclaration'
                            && t !== 'ExportDefaultDeclaration'
                        ) {
                            console.log(`❌  ${fullPath}`);
                            flagged = true;
                        }
                    },
                });
            }
        }
    }
};

void findIndexFiles('./src');