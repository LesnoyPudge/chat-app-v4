import path from 'node:path';
import fs from 'node:fs';
import { invariant } from '@lesnoypudge/utils';
import { override } from './utils/override';
import { createTsData } from './utils/createTsData';
import { getNameParts } from './utils/getNameParts';
import { optimizeSVG } from './utils/optimizeSVG';
import { createObjectString } from './utils/createObjectString';
import { namePathEntryToObject } from './utils/namePathEntryToObject';



type AssetsObject = {
    IMAGES: {
        SPRITE: [string, string][];
        COMMON: [string, string][];
    };
    SOUNDS: [string, string][];
    VIDEOS: [string, string][];
};

const rootPath = process.cwd();
const rawAssetsDirPath = path.join(rootPath, 'rawAssets');
const generatedDirPath = path.join(rootPath, 'generated');
const generatedAssetsDirPath = path.join(
    generatedDirPath,
    'assets',
);

const generatedSpritePath = path.join(
    generatedDirPath,
    'SPRITE_SHEET.ts',
);

const generatedAssetsObjectPath = path.join(
    generatedDirPath,
    'ASSETS.ts',
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

const spriteImagePaths = fs.globSync([
    rawAssetsPath.images.sprite,
    '/**/*',
].join(''));

const commonImagePaths = fs.globSync([
    rawAssetsPath.images.background,
    rawAssetsPath.images.emoji,
    rawAssetsPath.images.other,
].map((name) => `${name}/**/*`));

const soundPaths = fs.globSync([
    rawAssetsPath.sounds,
].map((name) => `${name}/**/*`));

const videoPaths = fs.globSync([
    rawAssetsPath.videos,
].map((name) => `${name}/**/*`));

const main = () => {
    const ASSETS: AssetsObject = {
        IMAGES: {
            COMMON: [],
            SPRITE: [],
        },
        SOUNDS: [],
        VIDEOS: [],
    };

    const spriteArray: string[] = [];
    const spriteNameArray: string[] = [];

    spriteImagePaths.forEach((filePath) => {
        const fileName = path.basename(filePath);
        const { ext, name, fullName } = getNameParts(fileName);
        invariant(ext === 'svg');

        spriteNameArray.push(name);

        ASSETS.IMAGES.SPRITE.push([name, fileName]);

        const fileData = optimizeSVG({
            data: fs.readFileSync(filePath).toString(),
            name,
        });

        spriteArray.push(fileData);

        const filePathToWrite = path.join(
            generatedSpritePreviewPath,
            fullName,
        );

        override({
            pathToFile: filePathToWrite,
            data: fileData,
        });
    });
    console.log('sprites for preview written');

    const spriteData = createTsData([
        'export const SPRITE_SHEET: string = `',
        spriteArray.join(' \n'),
        '`;',
    ]);

    override({
        data: spriteData,
        pathToFile: generatedSpritePath,
    });
    console.log('sprite generated');

    commonImagePaths.forEach((filePath) => {
        const fileName = path.basename(filePath);
        const { ext, name, fullName } = getNameParts(fileName);

        // commonImageNamesArray.push(fullName);
        ASSETS.IMAGES.COMMON.push([name, fullName]);

        if (ext === 'svg') {
            const fileData = optimizeSVG({
                data: fs.readFileSync(filePath).toString(),
                name,
            });

            override({
                data: fileData,
                pathToFile: path.join(
                    generatedAssetsDirPath,
                    fullName,
                ),
            });

            return;
        }

        override({
            data: fs.readFileSync(filePath),
            pathToFile: path.join(
                generatedAssetsDirPath,
                fullName,
            ),
        });
    });
    console.log('common images created');

    soundPaths.map((filePath) => {
        const fileName = path.basename(filePath);
        const { fullName, name } = getNameParts(fileName);

        ASSETS.SOUNDS.push([name, fullName]);

        override({
            data: fs.readFileSync(filePath),
            pathToFile: path.join(generatedAssetsDirPath, fullName),
        });

        return fullName;
    });
    console.log('sounds generated');

    videoPaths.map((filePath) => {
        const fileName = path.basename(filePath);
        const { fullName, name } = getNameParts(fileName);

        ASSETS.VIDEOS.push([name, fullName]);

        override({
            data: fs.readFileSync(filePath),
            pathToFile: path.join(generatedAssetsDirPath, fullName),
        });

        return fullName;
    });
    console.log('videos generated');

    const assetsObject = createObjectString({
        name: 'ASSETS',
        obj: {
            IMAGES: {
                COMMON: namePathEntryToObject(ASSETS.IMAGES.COMMON),
                SPRITE: namePathEntryToObject(ASSETS.IMAGES.SPRITE),
            },
            SOUNDS: namePathEntryToObject(ASSETS.SOUNDS),
            VIDEOS: namePathEntryToObject(ASSETS.VIDEOS),
        },
    });

    override({
        data: createTsData([
            assetsObject.result,
            'export type ASSETS = typeof ASSETS;',
        ]),
        pathToFile: generatedAssetsObjectPath,
    });

    console.log('ASSETS object generated');
};

main();