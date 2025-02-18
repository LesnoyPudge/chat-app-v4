import path from 'node:path';
import fs from 'node:fs';
import { createId, invariant } from '@lesnoypudge/utils';
import { optimize } from 'svgo';



const rootPath = process.cwd();
const rawAssetsDirPath = path.join(rootPath, 'rawAssets');
const generatedDirPath = path.join(rootPath, 'generated');
const generatedAssetsDirPath = path.join(
    generatedDirPath,
    'assets',
);

const generatedCommonAssetNamesDeclarationPath = path.join(
    generatedDirPath,
    'assetNames.d.ts',
);

const generatedSpritePath = path.join(
    generatedDirPath,
    'spriteSheet.ts',
);

const generatedSpriteNamesTypePath = path.join(
    generatedDirPath,
    'spriteNames.d.ts',
);

const generatedSpritePreviewPath = path.join(
    generatedDirPath,
    'SPRITES_FOR_PREVIEW',
);

const rawAssetsPath = {
    font: path.join(rawAssetsDirPath, 'fonts/NotoSans'),
    sounds: path.join(rawAssetsDirPath, 'sounds'),
    videos: path.join(rawAssetsDirPath, 'videos'),
    images: {
        background: path.join(rawAssetsDirPath, 'images/background'),
        emoji: path.join(rawAssetsDirPath, 'images/emoji'),
        other: path.join(rawAssetsDirPath, 'images/other'),
        sprite: path.join(rawAssetsDirPath, 'images/sprite'),
    },
};

const optimizeSVG = ({
    data,
    name = `RANDOM_NAME_${createId()}`,
}: { data: string; name?: string }) => {
    let dataToModify = data;
    const optimized = optimize(dataToModify, {
        multipass: true,
        floatPrecision: 1,
        plugins: [{ name: 'cleanupIds', params: { minify: false } }],
    });

    dataToModify = optimized.data.replace('<svg', `<svg id="${name}"`);

    const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
    if (!dataToModify.includes(xmlns)) {
        dataToModify = dataToModify.replace('<svg', `<svg ${xmlns}`);
    }

    return dataToModify;
};

const toUpperSnake = (word: string) => {
    return word.toUpperCase().split('-').join('_');
};

const getNameParts = (fileName: string) => {
    const splittedName = fileName.split('.');
    if (splittedName.length < 2) throw new Error('Имя без расширения');

    const ext = splittedName.pop();
    invariant(ext);
    const name = toUpperSnake(splittedName.join('.'));

    return {
        name,
        ext,
    };
};

const main = () => {
    fs.rmSync(
        generatedAssetsDirPath,
        { force: true, recursive: true },
    );
    console.log('assets folder removed');

    fs.mkdirSync(
        generatedAssetsDirPath,
        { recursive: true },
    );
    console.log('assets folder created');

    fs.rmSync(
        generatedSpritePreviewPath,
        { recursive: true, force: true },
    );
    console.log('folder for sprites for preview removed');

    fs.mkdirSync(
        generatedSpritePreviewPath,
        { recursive: true },
    );
    console.log('folder for sprites for preview created');

    const spriteImagePaths = fs.globSync([
        rawAssetsPath.images.sprite,
        '/**/*',
    ].join(''));

    const spriteArray: string[] = [];
    const spriteNameArray: string[] = [];

    spriteImagePaths.forEach((filePath) => {
        let fileData = fs.readFileSync(filePath).toString();
        const fileName = path.basename(filePath);
        const { ext, name } = getNameParts(fileName);
        invariant(ext === 'svg');

        const newName = `${name}.${ext}`;

        spriteNameArray.push(name);

        fileData = optimizeSVG({
            data: fileData,
            name,
        });

        spriteArray.push(fileData);
        const fileToWrite = path.join(
            generatedSpritePreviewPath,
            newName,
        );

        fs.writeFileSync(
            fileToWrite,
            fileData,
            'utf8',
        );
    });
    console.log('sprites for preview written');

    const spriteData = [
        `// GENERATED IN ${path.basename(import.meta.filename)}\n`,
        'export const SPRITE_SHEET: string = `',
        spriteArray.join(' \n'),
        '`;',
    ].join('');

    fs.writeFileSync(
        generatedSpritePath,
        spriteData,
        'utf8',
    );
    console.log('sprite generated');

    const spriteNamesTypeData = [
        `// GENERATED IN ${path.basename(import.meta.filename)}\n`,
        'type SpriteNames = ',
        spriteNameArray.map((name) => `'${name}'`).join('| \n'),
        ';',
    ].join('');

    fs.writeFileSync(
        generatedSpriteNamesTypePath,
        spriteNamesTypeData,
        'utf8',
    );
    console.log('sprite names generated');

    const commonImagePaths = fs.globSync([
        rawAssetsPath.images.background,
        rawAssetsPath.images.emoji,
        rawAssetsPath.images.other,
    ].map((name) => `${name}/**/*`));

    const commonImageNamesArray: string[] = [];

    commonImagePaths.forEach((filePath) => {
        const fileName = path.basename(filePath);
        const { ext, name } = getNameParts(fileName);
        const newName = `${name}.${ext}`;

        commonImageNamesArray.push(newName);

        if (ext === 'svg') {
            let fileData = fs.readFileSync(filePath).toString();

            fileData = optimizeSVG({
                data: fileData,
                name,
            });

            fs.writeFileSync(
                path.join(
                    generatedAssetsDirPath,
                    newName,
                ),
                fileData,
                'utf8',
            );

            return;
        }

        fs.copyFileSync(
            filePath,
            path.join(
                generatedAssetsDirPath,
                newName,
            ),
        );
    });
    console.log('common images copied or written');

    const soundsAndVideosNames = fs.globSync([
        rawAssetsPath.sounds,
        rawAssetsPath.videos,
    ].map((name) => `${name}/**/*`)).map((filePath) => {
        const fileName = path.basename(filePath);
        const { ext, name } = getNameParts(fileName);
        const newName = `${name}.${ext}`;

        const data = fs.readFileSync(filePath);

        fs.writeFileSync(
            path.join(generatedAssetsDirPath, newName),
            data,
            'utf8',
        );

        return newName;
    });
    console.log('sounds and videos generated');

    const commonAssetNamesTypeData = [
        `// GENERATED IN ${path.basename(import.meta.filename)}\n`,
        'type CommonAssetNames = ',
        [
            ...commonImageNamesArray,
            ...soundsAndVideosNames,
        ].map((name) => `'${name}'`).join('| \n'),
        ';',
    ].join('');

    fs.writeFileSync(
        generatedCommonAssetNamesDeclarationPath,
        commonAssetNamesTypeData,
        'utf8',
    );
    console.log('common asset names generated');
};

main();