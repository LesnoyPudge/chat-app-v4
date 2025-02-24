import fs from 'node:fs';
import path from 'node:path';



const main = () => {
    const rootPath = process.cwd();
    const generatedDirPath = path.join(rootPath, 'generated');

    fs.rmSync(generatedDirPath, { force: true, recursive: true });

    fs.mkdirSync(generatedDirPath);
};

main();