import fs from 'node:fs/promises';
import path from 'node:path';



const countCode = async (dirs: string[]) => {
    let totalLines = 0;
    let totalChars = 0;

    const walk = async (p: string) => {
        const s = await fs.stat(p);

        if (s.isDirectory()) {
            const files = await fs.readdir(p);
            for (const f of files) {
                await walk(path.join(p, f));
            }
        } else {
            const content = await fs.readFile(p, 'utf8');
            totalLines += content.split('\n').length;
            totalChars += content.length;
        }
    };

    for (const dir of dirs) {
        await walk(path.join(process.cwd(), dir));
    }
    console.log(`Total lines: ${totalLines}`);
    console.log(`Total characters: ${totalChars}`);
};

void countCode([
    './src',
    './fakeServer',
    './fakeShared',
    './fakeSocket',
    './scripts',
    './twPlugins',
    './vitePlugins',
]);