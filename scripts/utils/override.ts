import fs from 'node:fs';
import path from 'node:path';



type Options = {
    pathToFile: string;
    data: string;
};

export const override = ({
    data,
    pathToFile,
}: Options) => {
    fs.mkdirSync(path.dirname(pathToFile), { recursive: true });

    fs.writeFileSync(
        pathToFile,
        data,
        'utf8',
    );
};